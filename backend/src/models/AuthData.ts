import bcrypt from 'bcrypt';

export class AuthData {
  constructor(
    private userID: number,
    private passwordHash: string
  ) {}

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }

  public getUserID(): number {
    return this.userID;
  }

  public getPasswordHash(): string {
    return this.passwordHash;
  }

}
