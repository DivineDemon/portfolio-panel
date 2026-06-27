import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import AnalyticsPage from "@/pages/analytics";
import BlogEditorPage from "@/pages/blog-editor";
import BlogPostsPage from "@/pages/blog-posts";
import ClientsPage from "@/pages/clients";
import DashboardPage from "@/pages/dashboard";
import LandingPage from "@/pages/landing";
import LeadMagnetEditorPage from "@/pages/lead-magnet-editor";
import LeadMagnetsPage from "@/pages/lead-magnets";
import LeadsPage from "@/pages/leads";
import LoginPage from "@/pages/login";
import OutreachPage from "@/pages/outreach";
import PageEditorPage from "@/pages/page-editor";
import PagesPage from "@/pages/pages";
import ProjectCreatePage from "@/pages/project-create";
import ProjectDetailsPage from "@/pages/project-details";
import ProjectsPage from "@/pages/projects";
import QuickLinkPage from "@/pages/quick-link";
import SiteSettingsPage from "@/pages/site-settings";
import WorkflowCreatePage from "@/pages/workflow-create";
import WorkflowDetailsPage from "@/pages/workflow-details";
import WorkflowsPage from "@/pages/workflows";

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
          <Route path="workflows" element={<WorkflowsPage />} />
          <Route path="workflows/create" element={<WorkflowCreatePage />} />
          <Route path="workflows/:id" element={<WorkflowDetailsPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="pages" element={<PagesPage />} />
          <Route path="pages/new" element={<PageEditorPage />} />
          <Route path="pages/:id" element={<PageEditorPage />} />
          <Route path="blog" element={<BlogPostsPage />} />
          <Route path="blog/new" element={<BlogEditorPage />} />
          <Route path="blog/:id" element={<BlogEditorPage />} />
          <Route path="lead-magnets" element={<LeadMagnetsPage />} />
          <Route path="lead-magnets/new" element={<LeadMagnetEditorPage />} />
          <Route path="lead-magnets/:id" element={<LeadMagnetEditorPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="outreach" element={<OutreachPage />} />
          <Route path="site-settings" element={<SiteSettingsPage />} />
          <Route path="quick-link" element={<QuickLinkPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
