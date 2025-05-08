import React from "react";
import NavBar from "../NavBar";
import "./advisorTemplates.css";

interface Template {
  id: string;
  title: string;
  description: string;
}

const mockTemplates: Template[] = [
  { id: "t1", title: "Template 1", description: "Default template A description." },
  { id: "t2", title: "Template 2", description: "Default template B description." },
  { id: "t3", title: "Template 3", description: "Default template C description." },
];

const AdvisorTemplates: React.FC = () => {
  const templates = mockTemplates;

  const handleAdd = () => {
    // navigate to student create template page
  };
  const handleRemove = () => {
    // prompt for which template to remove
  };
  const handlePublish = () => {
    // publish all templates to students
  };
  const goManageCourses = () => {
    // navigate to manage courses page
  };
  const goManageConfigs = () => {
    // navigate to manage configs page
  };

  return (
    <div className="advisor-templates-container">
      <NavBar />
      <main className="advisor-templates-content">
        <div className="template-controls-top">
          <button className="control-button" onClick={goManageCourses}>
            Manage Courses
          </button>
          <button className="control-button" onClick={goManageConfigs}>
            Manage Configs
          </button>
        </div>

        <h2 className="published-templates-title">Published Templates</h2>
        <div className="templates-list">
          {templates.map((tpl) => (
            <div key={tpl.id} className="template-card">
              <h3 className="template-title">{tpl.title}</h3>
              <p className="template-description">{tpl.description}</p>
            </div>
          ))}
        </div>

        <div className="template-controls">
          <button onClick={handleAdd}>Add Template</button>
          <button onClick={handleRemove}>Remove Template</button>
          <button onClick={handlePublish}>Publish Templates</button>
        </div>
      </main>
    </div>
  );
};

export default AdvisorTemplates;