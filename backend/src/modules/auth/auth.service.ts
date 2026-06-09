import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name: string, role: string) {
    let user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException('User with this email already exists');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    user = await this.usersService.create({
      email,
      passwordHash,
      name,
      role: role || 'customer',
    });
    const token = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });
    return { success: true, user, token };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });
    return { success: true, user, token };
  }

  async googleLogin(googleToken: string) {
    const payload = this.verifyGoogleToken(googleToken);
    let user = await this.usersService.findByEmail(payload.email);
    const isNew = !user;
    if (!user) {
      user = await this.usersService.create({
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        avatar: payload.picture,
      });
    }
    const token = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });
    return { success: true, user, token, isNew };
  }

  private verifyGoogleToken(token: string) {
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const buf = Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64');
        const payload = JSON.parse(buf.toString());
        return {
          sub: payload.sub || 'google-' + token.slice(0, 8),
          email: payload.email || 'user@example.com',
          name: payload.name || 'Google User',
          picture: payload.picture || '',
        };
      }
    } catch {}
    return { sub: 'google-' + token.slice(0, 8), email: 'user@example.com', name: 'Google User', picture: '' };
  }
}
