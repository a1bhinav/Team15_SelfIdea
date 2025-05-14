import { Course } from '../Course';

describe('Course Class', () => {
  let course: Course;
  let prerequisiteCourse: Course;

  beforeEach(() => {
    prerequisiteCourse = new Course('Introduction to Computer Science', 'CS101', 4);
    course = new Course('Data Structures', 'CS102', 4, [prerequisiteCourse]);
  });

  it('should initialize a Course object correctly', () => {
    const newCourse = new Course('Algorithms', 'CS201', 4);
    expect(newCourse.name).toBe('Algorithms');
    expect(newCourse.id).toBe('CS201');
    expect(newCourse.credits).toBe(4);
    expect(newCourse.getPrerequisites()).toEqual([]);
  });

  it('should return prerequisites correctly', () => {
    expect(course.getPrerequisites()).toEqual([prerequisiteCourse]);
  });

  it('should set prerequisites correctly', () => {
    const newPrerequisite = new Course('Introduction to Mathematics', 'MATH101', 3);
    course.setPrerequisites([newPrerequisite]);
    expect(course.getPrerequisites()).toEqual([newPrerequisite]);
  });

  it('should handle multiple prerequisites', () => {
    const prereq1 = new Course('Introduction to Mathematics', 'MATH101', 3);
    const prereq2 = new Course('Algorithms', 'CS201', 4);
    course.setPrerequisites([prereq1, prereq2]);
    expect(course.getPrerequisites()).toEqual([prereq1, prereq2]);
  });
});
