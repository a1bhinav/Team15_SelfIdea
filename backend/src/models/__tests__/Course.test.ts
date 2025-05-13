import { Course } from '../Course';

describe('Course Class', () => {
  it('should initialize a Course object correctly', () => {
    const course = new Course('Introduction to Mathematics', 'MATH101', 3);
    expect(course.name).toBe('Introduction to Mathematics');
    expect(course.id).toBe('MATH101');
    expect(course.credits).toBe(3);
    expect(course.getPrerequisites()).toEqual([]);
  });

  it('should set prerequisites correctly', () => {
    const course1 = new Course('Introduction to Computer Science', 'CS101', 4);
    const course2 = new Course('Data Structures', 'CS102', 4, [course1]);

    course2.setPrerequisites([course1]);
    expect(course2.getPrerequisites()).toEqual([course1]);
  });

  it('should get prerequisites correctly', () => {
    const course1 = new Course('Introduction to Computer Science', 'CS101', 4);
    const course2 = new Course('Data Structures', 'CS102', 4, [course1]);

    expect(course2.getPrerequisites()).toEqual([course1]);
  });
});
