export class Course {
    constructor(
      public name: string,
      public id: string,
      public credits: number,
      public prerequisites: Course[] = []
    ) {}
  
    getPrerequisites(): Course[] {
      return this.prerequisites;
    }
  
    setPrerequisites(prereqs: Course[]): void {
      this.prerequisites = prereqs;
    }
  }
  