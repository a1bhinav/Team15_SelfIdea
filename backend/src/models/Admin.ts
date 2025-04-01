import { Person, Role } from './Person';
import { Student } from './Student';
import { Advisor } from './Advisor';
import { AuthData } from './AuthData';

export class Admin extends Person {
  constructor(
    personID: number,
    name: string,
    authData: AuthData,
    email: string
  ) {
    super(personID, name, authData, Role.Admin, email);
  }

  getAllStudents(): Student[] {
    // Fetch and return all students
    return [];
  }

  getAllAdvisors(): Advisor[] {
    // Fetch and return all advisors
    return [];
  }

  setRole(p: Person, role: Role): void {
    p.role = role;
  }

  createPerson(name: string, email: string, role: Role): Person {
    const authData = new AuthData(0, ''); // generate or assign properly
    return new Person(0, name, authData, role, email);
  }

  deletePerson(personID: number): boolean {
    // Implement deletion logic
    return true;
  }
}
