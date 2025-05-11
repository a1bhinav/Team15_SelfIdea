import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import TranscriptUploadPage from "./components/TranscriptUploadPage";
import TranscriptReviewPage from "./components/TranscriptReviewPage";
import YourTemplate from "./components/YourTemplate";
import ProfilePage from "./components/ProfilePage";
import ApprovedPlan from "./components/ApprovedPlan";
import RejectedPlan from "./components/RejectedPlan";
import AdvisorDashboard from "./components/advisor/advisorDashboard";
import AdvisorTemplates from "./components/advisor/advisorTemplates";
import ManageCourses from "./components/advisor/ManageCourses";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/transcript",
    element: <TranscriptUploadPage />,
  },
  {
    path: "/transcript-review",
    element: <TranscriptReviewPage />,
  },
  {
    path: "/your-template",
    element: <YourTemplate />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/approved-plan",
    element: <ApprovedPlan />,
  },
  {
    path: "/rejected-plan",
    element: <RejectedPlan />,
  },
  {
    path: "/advisor-dashboard",
    element: <AdvisorDashboard />,
  },
  {
    path: "/advisor-templates",
    element: <AdvisorTemplates />,
  },
  {
    path: "/manage-courses",
    element: <ManageCourses />,
  }
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
