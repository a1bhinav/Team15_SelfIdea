import { AuthData } from './AuthData';

export enum Role {
  Student = 'Student',
  Advisor = 'Advisor',
  Admin = 'Admin'
}

export class Person {
  constructor(
    private personID: number,
    public name: string,
    private authData: AuthData,
    public role: Role,
    public email: string
  ) {}

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setAuthData(data: AuthData): void {
    this.authData = data;
  }

  public getPersonID(): number {
    return this.personID;
  }

  public getAuthData(): AuthData {
    return this.authData;
  }

  authenticate(password: string): boolean {
    return this.authData.validatePassword(password);
  }
}
