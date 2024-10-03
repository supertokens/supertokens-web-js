import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Auth from "./Auth.tsx";
import Dashboard from "./Dashboard.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Auth />,
    },
    {
        path: "/auth/callback/*",
        element: <Auth />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
