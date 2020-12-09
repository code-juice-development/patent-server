interface IHashProvider {
  generateToken(user_id: string): Promise<string>;

  verifyToken(token: string): Promise<string | undefined>;
}

export default IHashProvider;
