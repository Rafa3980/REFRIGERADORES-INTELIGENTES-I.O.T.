import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "./app/pages/LoginPage.jsx";
import RegisterPage from "./app/pages/RegisterPage.jsx";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/registro",
        element: <RegisterPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
