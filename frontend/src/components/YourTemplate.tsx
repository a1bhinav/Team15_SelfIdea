// src/components/YourTemplate.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "./YourTemplate.css";

const YourTemplate: React.FC = () => {
  const navigate = useNavigate();

  // initally starts with 8 semesters and 4 courses in each semester
  const initialSemesters = Array.from({ length: 8 }, () => Array(4).fill(""));

  const [semesters, setSemesters] = useState<string[][]>(initialSemesters);

  // Placeholder courses
  const courses = [
    "Course A",
    "Course B",
    "Course C",
    "Course D",
    "Course E",
    "Course F",
    "Course G",
    "Course H",
  ];

  const addSemester = () => {
    setSemesters((prev) => [...prev, Array(4).fill("")]);
  };

  const removeSemester = () => {
    setSemesters((prev) =>
      prev.length > 1 ? prev.slice(0, prev.length - 1) : prev
    );
  };

  const addCourse = (semesterIndex: number) => {
    setSemesters((prev) => {
      const updated = [...prev];
      updated[semesterIndex] = [...updated[semesterIndex], ""];
      return updated;
    });
  };

  const removeCourse = (semesterIndex: number) => {
    setSemesters((prev) => {
      const updated = [...prev];
      if (updated[semesterIndex].length > 1) {
        updated[semesterIndex] = updated[semesterIndex].slice(
          0,
          updated[semesterIndex].length - 1
        );
      }
      return updated;
    });
  };

  const handleCourseChange = (
    semesterIndex: number,
    courseIndex: number,
    value: string
  ) => {
    setSemesters((prev) => {
      const updated = [...prev];
      const updatedSemester = [...updated[semesterIndex]];
      updatedSemester[courseIndex] = value;
      updated[semesterIndex] = updatedSemester;
      return updated;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would send `semesters` to your backend...
    // Then navigate to the approved‑plan page:
    navigate("/approved-plan");
  };

  return (
    <div className="your-template-container">
      <NavBar />
      <main className="your-template-content">
        <h1 className="your-template-title">Your Template</h1>
        <div className="semester-controls">
          <button
            type="button"
            className="semester-button"
            onClick={addSemester}
          >
            Add Semester
          </button>
          <button
            type="button"
            className="semester-button"
            onClick={removeSemester}
          >
            Remove Semester
          </button>
        </div>

        <form className="template-form" onSubmit={handleSubmit}>
          <div className="template-grid">
            {semesters.map((semester, semesterIndex) => (
              <div key={semesterIndex} className="template-block">
                <h2 className="semester-title">
                  Semester {semesterIndex + 1}
                </h2>
                {semester.map((courseSelection, courseIndex) => (
                  <select
                    key={courseIndex}
                    className="template-dropdown"
                    value={courseSelection}
                    onChange={(e) =>
                      handleCourseChange(
                        semesterIndex,
                        courseIndex,
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select a course</option>
                    {courses.map((course, idx) => (
                      <option key={idx} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                ))}

                <div className="course-controls">
                  <button
                    type="button"
                    className="course-button"
                    onClick={() => addCourse(semesterIndex)}
                  >
                    Add Course
                  </button>
                  <button
                    type="button"
                    className="course-button"
                    onClick={() => removeCourse(semesterIndex)}
                  >
                    Remove Course
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button type="submit" className="template-submit-button">
            Submit Template
          </button>
        </form>
      </main>
    </div>
  );
};

export default YourTemplate;
