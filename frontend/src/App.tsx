import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import TranscriptUploadPage from "./components/TranscriptUploadPage";
import TranscriptReviewPage from "./components/TranscriptReviewPage";
import YourTemplate from "./components/YourTemplate";
import ProfilePage from "./components/ProfilePage";
import ApprovedPlan from "./components/ApprovedPlan";
import RejectedPlan from "./components/RejectedPlan";


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
  }
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
