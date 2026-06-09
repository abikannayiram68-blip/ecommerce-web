import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../src/modules/auth/auth.service';
import { UsersService } from '../../src/modules/users/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  const mockUser = { id: 1, email: 'test@example.com', name: 'Test', role: 'customer' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: { findByEmail: jest.fn(), create: jest.fn() } },
        { provide: JwtService, useValue: { sign: jest.fn().mockReturnValue('mock-jwt-token') } },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should login existing user', async () => {
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser as any);
    const result = await authService.googleLogin('valid-token');
    expect(result.success).toBe(true);
    expect(result.token).toBe('mock-jwt-token');
    expect(result.isNew).toBe(false);
  });

  it('should register new user on first login', async () => {
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
    jest.spyOn(usersService, 'create').mockResolvedValue(mockUser as any);
    const result = await authService.googleLogin('new-user-token');
    expect(result.success).toBe(true);
    expect(result.isNew).toBe(true);
  });
});
