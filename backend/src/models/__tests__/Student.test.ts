import { Student } from '../Student';
import { Course } from '../Course';
import { CourseTemplate } from '../CourseTemplate';
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
    const course1 = new Course('Introduction to Mathematics', 'MATH101', 3);
    const course2 = new Course('Introduction to Computer Science', 'CS101', 4);

    student.coursesTaken.push(course1, course2);
    expect(student.getCoursesTaken()).toEqual([course1, course2]);
  });

  it('should return course templates', () => {
    const courseTemplate = new CourseTemplate('Template 1', []);
    student.appendCourseTemplate(courseTemplate);
    expect(student.getCourseTemplates()).toEqual([courseTemplate]);
  });

  it('should append a course template', () => {
    const courseTemplate = new CourseTemplate('Template 1', []);
    student.appendCourseTemplate(courseTemplate);
    expect(student.courseTemplates).toContain(courseTemplate);
  });

  it('should remove a course template', () => {
    const courseTemplate1 = new CourseTemplate('Template 1', []);
    const courseTemplate2 = new CourseTemplate('Template 2', []);
    student.appendCourseTemplate(courseTemplate1);
    student.appendCourseTemplate(courseTemplate2);

    student.removeCourseTemplate(courseTemplate1);
    expect(student.courseTemplates).not.toContain(courseTemplate1);
    expect(student.courseTemplates).toContain(courseTemplate2);
  });
});
