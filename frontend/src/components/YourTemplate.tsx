import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./YourTemplate.css";

const YourTemplate: React.FC = () => {
  // initally starts with 8 semesters and 4 courses in each semester
  const initialSemesters = Array.from({ length: 8 }, () => Array(4).fill(""));

  const [semesters, setSemesters] = useState<string[][]>(initialSemesters);
  const [apiCourses, setApiCourses] = useState<string[]>([]);
  const [templateName, setTemplateName] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses/course-ids");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setApiCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        // Optionally, set some error state here to display to the user
      }
    };

    fetchCourses();
  }, []);

  const addSemester = () => {
    // adds a new sem with 4 courses
    setSemesters((prev) => [...prev, Array(4).fill("")]);
  };

  const removeSemester = () => {
    // remove last sem
    setSemesters((prev) => (prev.length > 1 ? prev.slice(0, prev.length - 1) : prev));
  };

  // add a new course to the sem
  const addCourse = (semesterIndex: number) => {
    setSemesters((prev) => {
      const updated = [...prev];
      updated[semesterIndex] = [...updated[semesterIndex], ""];
      return updated;
    });
  };
  // remove last course from the sem
  const removeCourse = (semesterIndex: number) => {
    setSemesters((prev) => {
      const updated = [...prev];
      if (updated[semesterIndex].length > 1) {
        updated[semesterIndex] = updated[semesterIndex].slice(0, updated[semesterIndex].length - 1);
      }
      return updated;
    });
  };

  const handleCourseChange = (semesterIndex: number, courseIndex: number, value: string) => {
    setSemesters((prev) => {
      const updated = [...prev];
      const updatedSemester = [...updated[semesterIndex]];
      updatedSemester[courseIndex] = value;
      updated[semesterIndex] = updatedSemester;
      return updated;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: Replace with actual student ID from auth or context
    const studentId = "20202020"; 

    if (!templateName.trim()) {
      alert("Please enter a name for your template.");
      return;
    }

    const formattedSemesters = semesters.map((semesterCourses, index) => ({
      name: `Semester ${index + 1}`,
      courses: semesterCourses.filter(course => course !== ""), // Filter out unselected courses
    }));

    const courseTemplateData = {
      name: templateName,
      semesters: formattedSemesters,
    };

    console.log("Submitting template:", courseTemplateData);

    try {
      const response = await fetch("http://localhost:5000/api/append-course-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId, // You'll need to get this from your auth system
          courseTemplate: courseTemplateData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Backend response:", result);
      alert("Template submitted successfully!");
      // Optionally, redirect or clear the form
      // setTemplateName("");
      // setSemesters(initialSemesters);

    } catch (error) {
      console.error("Failed to submit template:", error);
      alert(`Failed to submit template: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  return (
    <div className="your-template-container">
      <NavBar />
      <main className="your-template-content">
        <h1 className="your-template-title">Your Template</h1>
        <div className="semester-controls">
          <button type="button" className="semester-button" onClick={addSemester}>
            Add Semester
          </button>
          <button type="button" className="semester-button" onClick={removeSemester}>
            Remove Semester
          </button>
        </div>

        <form className="template-form" onSubmit={handleSubmit}>
          <div className="template-grid-header">
            <label htmlFor="templateName" className="template-name-label">Template Name:</label>
            <input
              type="text"
              id="templateName"
              className="template-name-input"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name"
              required
            />
          </div>
          <div className="template-grid">
            {semesters.map((semester, semesterIndex) => (
              <div key={semesterIndex} className="template-block">
                <h2 className="semester-title">Semester {semesterIndex + 1}</h2>
                {semester.map((courseSelection, courseIndex) => (
                  <select
                    key={courseIndex}
                    className="template-dropdown"
                    value={courseSelection}
                    onChange={(e) =>
                      handleCourseChange(semesterIndex, courseIndex, e.target.value)
                    }
                  >
                    <option value="">Select a course</option>
                    {apiCourses.map((course, idx) => (
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
