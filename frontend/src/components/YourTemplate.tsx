import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./YourTemplate.css";

// Define the structure for a course object
interface Course {
  id: string; // Unique identifier for the course, e.g., "COMPSCI187"
  name: string; // Display name, e.g., "Programming with Data Structures"
  credits: number; // Number of credits for the course
}

// Define the structure for a selected course in a semester, which might include a grade later
// For now, it will mirror the Course structure but 'id' is the crucial part from selection
interface SelectedCourse {
  id: string;
  name: string;
  credits: number;
  // grade?: string; // Optional: for future implementation
}

const YourTemplate: React.FC = () => {

  // Initialize with 8 semesters, each capable of holding 4 SelectedCourse objects (or null if empty)
  const initialSemesters = Array.from({ length: 8 }, () =>
    Array(4).fill(null as SelectedCourse | null)
  );


  const [semesters, setSemesters] = useState<(SelectedCourse | null)[][]>(initialSemesters);
  const [apiCourses, setApiCourses] = useState<Course[]>([]); // Stores full course objects from API
  const [templateName, setTemplateName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // IMPORTANT: Assuming this endpoint now returns Array<Course>
        // e.g., [{ id: "CS101", name: "Intro to CS", credits: 3 }, ...]
        const response = await fetch("http://localhost:5000/api/course-ids");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Course[] = await response.json();
        setApiCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch courses");
      }
    };


  const addSemester = () => {

    setSemesters((prev) => [...prev, Array(4).fill(null as SelectedCourse | null)]);
  };

  const removeSemester = () => {
    setSemesters((prev) => (prev.length > 1 ? prev.slice(0, prev.length - 1) : prev));
  };


  const addCourse = (semesterIndex: number) => {
    setSemesters((prev) => {
      const updated = [...prev];
      updated[semesterIndex] = [...updated[semesterIndex], null];
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


  const handleCourseChange = (semesterIndex: number, courseIndex: number, selectedCourseId: string) => {

    setSemesters((prev) => {
      const updated = prev.map(s => [...s]); // Deep copy semesters and courses
      const course = apiCourses.find(c => c.id === selectedCourseId);
      if (course) {
        updated[semesterIndex][courseIndex] = { id: course.id, name: course.name, credits: course.credits };
      } else {
        updated[semesterIndex][courseIndex] = null; // Or handle as an error / reset
      }
      return updated;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null); // Clear previous errors

    const studentId = "20202020"; // TODO: Replace with actual student ID

    if (!templateName.trim()) {
      alert("Please enter a name for your template.");
      return;
    }

    const formattedSemesters = semesters.map((semesterCourses, index) => {
      const coursesInSemester = semesterCourses
        .filter((course): course is SelectedCourse => course !== null) // Type guard
        .map(course => ({
          name: course.name,
          credits: course.credits,
          // grade: course.grade, // Add if/when grade is implemented
        }));
      
      return {
        name: `Semester ${index + 1}`, // Placeholder name, can be made dynamic later
        courses: coursesInSemester,
      };
    }).filter(semester => semester.courses.length > 0); // Optional: remove semesters with no courses

    if (formattedSemesters.length === 0 && !semesters.flat().some(c => c !== null)) {
        alert("Please add at least one course to your template.");
        return;
    }

    const courseTemplateData = {
      name: templateName,
      semesters: formattedSemesters,
    };

    console.log("Submitting template:", JSON.stringify(courseTemplateData, null, 2));

    try {
      const response = await fetch("http://localhost:5000/api/append-course-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId,
          courseTemplate: courseTemplateData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Failed to parse error response." })); // Handle non-JSON error response
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
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred during submission.";
      setError(errorMessage);
      alert(`Failed to submit template: ${errorMessage}`);
    }

  };

  return (
    <div className="your-template-container">
      <NavBar />
      <main className="your-template-content">
        <h1 className="your-template-title">Create Your Course Template</h1>
        {error && <p className="template-error-message">Error: {error}</p>}
        <div className="semester-controls">
          <button
            type="button"
            className="semester-button"
            onClick={addSemester}
          >
            Add Semester
          </button>

          <button type="button" className="semester-button" onClick={removeSemester}>
            Remove Last Semester

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
                {semester.map((selectedCourse, courseIndex) => (

                  <select
                    key={courseIndex}
                    className="template-dropdown"
                    value={selectedCourse ? selectedCourse.id : ""} // Use course id as value
                    onChange={(e) =>
                      handleCourseChange(
                        semesterIndex,
                        courseIndex,
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select a course</option>
                    {/* Populate with actual course names from apiCourses, use course.id as value */}
                    {apiCourses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.id}
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
                    Add Course Slot
                  </button>
                  <button
                    type="button"
                    className="course-button"
                    onClick={() => removeCourse(semesterIndex)}
                  >
                    Remove Last Course Slot
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button type="submit" className="template-submit-button">
            Save Template
          </button>
        </form>
      </main>
    </div>
  );
};

export default YourTemplate;
