import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { decryptObject } from 'src/application/utils/crypto';
import { IS_PUBLIC_KEY } from '../decorator/public';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const isPublic = this.reflector.get<boolean>(
        IS_PUBLIC_KEY,
        context.getHandler(),
      );
      if (isPublic) {
        return true; // Permite acesso se o endpoint for marcado como público
      }
      const request = context.switchToHttp().getRequest();
      const token = request.headers['user'];

      if (!token) {
        throw new UnauthorizedException('Token não encontrado');
      }
      decryptObject(token);

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
