import { sign, verify } from 'jsonwebtoken';

import ITokenProvider from '@modules/users/providers/TokenProvider/models/ITokenProvider';

interface ITokenPaylod {
  iat: number;

  exp: number;

  sub: string;
}

class JWTTokenProvider implements ITokenProvider {
  public async generateToken(user_id: string): Promise<string> {
    const token = sign({}, String(process.env.SECRET), {
      subject: user_id,
      expiresIn: '30d',
    });

    return token;
  }

  public async verifyToken(token: string): Promise<string | undefined> {
    try {
      const { sub } = verify(token, String(process.env.SECRET)) as ITokenPaylod;

      return sub;
    } catch {
      return undefined;
    }
  }
}

export default JWTTokenProvider;
