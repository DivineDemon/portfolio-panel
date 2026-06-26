import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import ClientsPage from "@/pages/clients";
import DashboardPage from "@/pages/dashboard";
import LandingPage from "@/pages/landing";
import LoginPage from "@/pages/login";
import ProjectCreatePage from "@/pages/project-create";
import ProjectDetailsPage from "@/pages/project-details";
import ProjectsPage from "@/pages/projects";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/new" element={<ProjectCreatePage />} />
          <Route path="projects/:id" element={<ProjectDetailsPage />} />
          <Route path="clients" element={<ClientsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
