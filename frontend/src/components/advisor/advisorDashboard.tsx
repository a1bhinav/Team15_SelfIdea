// AdvisorDashboard.tsx
import React from "react";
import NavBar from "../NavBar";
import "./AdvisorDashboard.css";

interface Advisor {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
}

const mockAdvisor: Advisor = {
  id: "1",
  name: "Aditi Bansal",
  email: "aditi.bansal@example.edu",
  role: "Advisor",
};

const mockStudents: Student[] = [
  { id: "s1", name: "John Doe", email: "john.doe@example.edu" },
  { id: "s2", name: "John Doe", email: "john.doe@example.edu" },
  { id: "s3", name: "John Doe", email: "john.doe@example.edu" },
  { id: "s4", name: "John Doe", email: "john.doe@example.edu" },
  { id: "s5", name: "John Doe", email: "john.doe@example.edu" },
  { id: "s6", name: "John Doe", email: "john.doe@example.edu" },
  { id: "s7", name: "John Doe", email: "john.doe@example.edu" },
  { id: "s8", name: "John Doe", email: "john.doe@example.edu" },

];

const AdvisorDashboard: React.FC = () => {
  const advisor = mockAdvisor;
  const students = mockStudents;

  return (
    <div className="advisor-dashboard-container">
      <NavBar />
      <main className="advisor-dashboard-content">
        <h1 className="advisor-title">Advisor Dashboard</h1>
        <div className="dashboard-body">
          <section className="advisor-info-block">
            <div>
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{advisor.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{advisor.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Role:</span>
                <span className="info-value">{advisor.role}</span>
              </div>
            </div>
          </section>

          <section className="students-panel">
            <h2 className="students-title">My Students</h2>
            <div className="students-list">
              {students.map((student) => (
                <div key={student.id} className="student-card">
                  <h3 className="student-name">{student.name}</h3>
                  <p className="student-email">{student.email}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdvisorDashboard;