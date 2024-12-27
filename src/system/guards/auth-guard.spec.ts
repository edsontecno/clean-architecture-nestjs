import { Reflector } from '@nestjs/core';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { decryptObject } from '../../application/utils/crypto';
import { AuthGuard } from './authGuard';

jest.mock('../../application/utils/crypto', () => ({
  decryptObject: jest.fn(),
}));

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let reflectorMock: Partial<Reflector>;

  beforeEach(() => {
    reflectorMock = {
      get: jest.fn(),
    };

    authGuard = new AuthGuard(reflectorMock as Reflector);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  describe('canActivate', () => {
    const mockExecutionContext = (headers: Record<string, string>) =>
      ({
        switchToHttp: () => ({
          getRequest: () => ({ headers }),
        }),
        getHandler: jest.fn(),
      }) as unknown as ExecutionContext;

    it('should allow access if the route is public', () => {
      (reflectorMock.get as jest.Mock).mockReturnValue(true);

      const context = mockExecutionContext({});
      const result = authGuard.canActivate(context);

      expect(result).toBe(true);
      expect(reflectorMock.get).toHaveBeenCalledWith(
        'isPublic',
        context.getHandler(),
      );
    });

    it('should throw an UnauthorizedException if the token is invalid', () => {
      (reflectorMock.get as jest.Mock).mockReturnValue(false);

      const context = mockExecutionContext({ user: 'invalid_token' });
      (decryptObject as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      expect(() => authGuard.canActivate(context)).toThrow(
        new UnauthorizedException('Token inválido'),
      );
    });

    it('should allow access if a valid token is provided', () => {
      (reflectorMock.get as jest.Mock).mockReturnValue(false);

      const context = mockExecutionContext({ user: 'valid_token' });
      (decryptObject as jest.Mock).mockReturnValue({ valid: true });

      const result = authGuard.canActivate(context);

      expect(result).toBe(true);
      expect(decryptObject).toHaveBeenCalledWith('valid_token');
    });
  });
});
