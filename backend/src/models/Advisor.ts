import { Person } from './Person';
import { CourseTemplate } from './CourseTemplate';
import { Configuration } from './Configuration';
import { ConfigFile } from './ConfigFile';
import { Course } from './Course';

export class Advisor extends Person {
  private defaultTemplates: CourseTemplate[] = [];
  private configurations: Configuration[] = [];

  constructor(
    personID: number,
    name: string,
    authData: AuthData,
    email: string
  ) {
    super(personID, name, authData, Role.Advisor, email);
  }

  getDefaultTemplates(): CourseTemplate[] {
    return this.defaultTemplates;
  }

  appendDefaultTemplate(c: CourseTemplate): void {
    this.defaultTemplates.push(c);
  }

  removeDefaultTemplate(c: CourseTemplate): void {
    this.defaultTemplates = this.defaultTemplates.filter(template => template !== c);
  }

  uploadMajorConfig(c: ConfigFile): void {
    const newConfig = new Configuration(c.parse());
    this.configurations.push(newConfig);
  }

  appendCourseToDatabase(courses: Course[]): void {
    // Implement logic to persist courses
  }

  removeCourseFromDatabase(courses: Course[]): void {
    // Implement logic to remove courses from database
  }
}
