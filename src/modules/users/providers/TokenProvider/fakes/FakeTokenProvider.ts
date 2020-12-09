import ITokenProvider from '@modules/users/providers/TokenProvider/models/ITokenProvider';

class JWTTokenProvider implements ITokenProvider {
  public async generateToken(user_id: string): Promise<string> {
    return user_id;
  }

  public async verifyToken(token: string): Promise<string | undefined> {
    return token;
  }
}

export default JWTTokenProvider;
