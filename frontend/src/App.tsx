import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import TranscriptUploadPage from "./components/TranscriptUploadPage";
import TranscriptReviewPage from "./components/TranscriptReviewPage";


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
  }
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
