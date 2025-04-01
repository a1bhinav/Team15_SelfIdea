import bcrypt from 'bcrypt';

export class AuthData {
  constructor(
    private userID: number,
    private passwordHash: string
  ) {}

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }
}
