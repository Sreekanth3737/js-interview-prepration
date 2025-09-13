import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter, Link } from "react-router-dom";
import "./index.css";
import Challenges from "./Pages/Challenges.tsx";
import Home from "./Pages/Home.tsx";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <Link to="/">⬅ Back to Home</Link>
    </div>
  );
}

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Challenges />,
    errorElement: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
);
