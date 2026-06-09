import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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
    return { sub: 'google-' + token.slice(0, 8), email: 'user@example.com', name: 'Google User', picture: '' };
  }
}
