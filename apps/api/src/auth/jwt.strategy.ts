import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * Stratégie JWT utilisée pour authentifier les requêtes
 * Cherche le token dans le cookie "access_token" ou dans l'en-tête Authorization Bearer
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const cookieExtractor = (req: any) => req?.cookies?.['access_token'] ?? null;
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev_jwt_secret',
    });
  }

  async validate(payload: any) {
    // Ici on retourne l'objet user disponible dans req.user
    return { email: payload.email, role: payload.role };
  }
}
