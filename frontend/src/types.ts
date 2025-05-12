export type Role = 'Student' | 'Advisor' | 'Admin';

export interface Person {
  personID: number;
  name: string;
  email: string;
  role: Role;
}
