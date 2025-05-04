export class Course {
  constructor(
    public name: string,
    public id: string,
    public credits: number,
    public prerequisites: Course[] = []
  ) { }

  getPrerequisites(): Course[] {
    return this.prerequisites;
  }

  setPrerequisites(prereqs: Course[]): void {
    this.prerequisites = prereqs;
  }
}


// Mongodb should connect to this variable. all future classes like semesters will depend on this
export let courseExampleJSON = [
  {
    name: "Introduction to Mathematics",
    id: "MATH101",
    credits: 3,
    prerequisites: []
  },
  {
    name: "Introduction to Computer Science",
    id: "CS101",
    credits: 4,
    prerequisites: []
  },
  {
    name: "Data Structures",
    id: "CS102",
    credits: 4,
    prerequisites: ["CS101"]
  },
  {
    name: "Algorithms",
    id: "CS201",
    credits: 4,
    prerequisites: ["CS102"]
  },
  {
    name: "Operating Systems",
    id: "CS301",
    credits: 4,
    prerequisites: ["CS201"]
  },
  {
    name: "Advanced Topics in CS",
    id: "CS401",
    credits: 3,
    prerequisites: ["CS301", "CS201"]
  }
];


export const courseExampleDatabase: Course[] = [];

// hacky fix for now
//the issue is that we need to ensure that every course added also has its prerequisite course added as well because 
// otherwise it will try to link to a course prerequisite to a non existent one
// TODO
courseExampleJSON.forEach(entry => {
  const prereqs = entry.prerequisites.map(prereqId =>
    courseExampleDatabase.find(c => c.id === prereqId)!
  );
  const course = new Course(entry.name, entry.id, entry.credits, prereqs);
  courseExampleDatabase.push(course);
});

