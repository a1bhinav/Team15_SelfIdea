import React, { useState, ChangeEvent } from "react";
import NavBar from "../NavBar";
import "./ManageCourses.css";

interface Course {
  id: string;
  number: string;
  title: string;
  prerequisites: string;
  credits: number;
}

const initialCourses: Course[] = [
  { id: "c1", number: "CS101", title: "Intro to Computer Science", prerequisites: "None", credits: 3 },
  { id: "c1", number: "CS101", title: "Intro to Computer Science", prerequisites: "None", credits: 3 },
  { id: "c1", number: "CS101", title: "Intro to Computer Science", prerequisites: "None", credits: 3 },
  { id: "c1", number: "CS101", title: "Intro to Computer Science", prerequisites: "None", credits: 3 },
  { id: "c1", number: "CS101", title: "Intro to Computer Science", prerequisites: "None", credits: 3 },
  { id: "c1", number: "CS101", title: "Intro to Computer Science", prerequisites: "None", credits: 3 },
  { id: "c1", number: "CS101", title: "Intro to Computer Science", prerequisites: "None", credits: 3 },
  { id: "c1", number: "CS101", title: "Intro to Computer Science", prerequisites: "None", credits: 3 },
  { id: "c1", number: "CS101", title: "Intro to Computer Science", prerequisites: "None", credits: 3 },
  { id: "c1", number: "CS101", title: "Intro to Computer Science", prerequisites: "None", credits: 3 },
  { id: "c1", number: "CS101", title: "Intro to Computer Science", prerequisites: "None", credits: 3 },
  { id: "c1", number: "CS101", title: "Intro to Computer Science", prerequisites: "None", credits: 3 },
  { id: "c1", number: "CS101", title: "Intro to Computer Science", prerequisites: "None", credits: 3 },

];

const ManageCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [credits, setCredits] = useState(0);

  const handleAddCourse = () => {
    if (!number.trim() || !title.trim()) return;
    const newCourse: Course = {
      id: Date.now().toString(),
      number,
      title,
      prerequisites,
      credits,
    };
    setCourses(prev => [...prev, newCourse]);
    setNumber("");
    setTitle("");
    setPrerequisites("");
    setCredits(0);
  };

  const handleRemove = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="manage-courses-container">
      <NavBar />
      <main className="manage-courses-content">
        <h1 className="courses-title">Manage Courses</h1>

        <div className="course-form">
          <input
            type="text"
            className="course-input"
            placeholder="Course Number"
            value={number}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)}
          />
          <input
            type="text"
            className="course-input"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="course-input"
            placeholder="Prerequisites"
            value={prerequisites}
            onChange={e => setPrerequisites(e.target.value)}
          />
          <input
            type="number"
            className="course-input"
            placeholder="Credits"
            value={credits}
            onChange={e => setCredits(Number(e.target.value))}
          />
          <button className="control-button" onClick={handleAddCourse}>
            Add Course
          </button>
        </div>

        <div className="courses-list">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-info">
                <span className="course-number">{course.number}</span>
                <span className="course-title">{course.title}</span>
                <span className="course-prereq">
                  <strong>Prerequisites:</strong> {course.prerequisites || "None"}
                </span>
                <span className="course-credits">
                  <strong>Credits:</strong> {course.credits}
                </span>
              </div>
              <button className="remove-button" onClick={() => handleRemove(course.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ManageCourses;
