import { Student, exampleStudent } from '../Student';
import { courseExampleDatabase } from '../Course';
import { CourseTemplate, exampleCourseTemplate } from '../CourseTemplate';
import { AuthData } from '../AuthData';

describe('Student Class', () => {
  let student: Student;
  let exampleAuthData: AuthData;

  beforeEach(() => {
    exampleAuthData = new AuthData(1, 'secure_password_hash');
    student = new Student(
      54321,
      'Jane Doe',
      exampleAuthData,
      'jane.doe@example.edu',
      20202020,
      'Mathematics'
    );
  });

  it('should initialize a Student object correctly', () => {
    expect(student.name).toBe('Jane Doe');
    expect(student.email).toBe('jane.doe@example.edu');
    expect(student.spireID).toBe(20202020);
    expect(student.major).toBe('Mathematics');
    expect(student.coursesTaken).toEqual([]);
    expect(student.courseTemplates).toEqual([]);
  });

  it('should set the Spire ID correctly', () => {
    student.setSpireID(30303030);
    expect(student.spireID).toBe(30303030);
  });

  it('should set the major correctly', () => {
    student.setMajor('Computer Science');
    expect(student.major).toBe('Computer Science');
  });

  it('should return courses taken', () => {
    student.coursesTaken.push(courseExampleDatabase[0], courseExampleDatabase[1]);
    expect(student.getCoursesTaken()).toEqual([courseExampleDatabase[0], courseExampleDatabase[1]]);
  });

  it('should return course templates', () => {
    student.appendCourseTemplate(exampleCourseTemplate);
    expect(student.getCourseTemplates()).toEqual([exampleCourseTemplate]);
  });

  it('should append a course template', () => {
    student.appendCourseTemplate(exampleCourseTemplate);
    expect(student.courseTemplates).toContain(exampleCourseTemplate);
  });

  it('should remove a course template', () => {
    const courseTemplate2 = new CourseTemplate('Template 2', []);
    student.appendCourseTemplate(exampleCourseTemplate);
    student.appendCourseTemplate(courseTemplate2);

    student.removeCourseTemplate(exampleCourseTemplate);
    expect(student.courseTemplates).not.toContain(exampleCourseTemplate);
    expect(student.courseTemplates).toContain(courseTemplate2);
  });

  it('should validate the exampleStudent object', () => {
    expect(exampleStudent.name).toBe('Jane Doe');
    expect(exampleStudent.email).toBe('jane.doe@example.edu');
    expect(exampleStudent.spireID).toBe(20202020);
    expect(exampleStudent.major).toBe('Mathematics');
    expect(exampleStudent.coursesTaken).toEqual([
      courseExampleDatabase[0],
      courseExampleDatabase[1],
      courseExampleDatabase[2],
    ]);
    expect(exampleStudent.courseTemplates).toEqual([exampleCourseTemplate]);
  });
});
