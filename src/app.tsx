import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import Dashboard from "./pages/dashboard";
import ProjectCreate from "./pages/project-create";
import ProjectDetails from "./pages/project-details";
import Projects from "./pages/projects";
import Testimonials from "./pages/testimonials";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<ProjectCreate />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Route>
    </Routes>
  );
};

export default App;
