import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Companies from "./pages/companies";
import CompanyDetails from "./pages/company-details";
import Dashboard from "./pages/dashboard";
import ProjectDetails from "./pages/project-details";
import Testimonials from "./pages/testimonials";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/companies/:id" element={<CompanyDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
