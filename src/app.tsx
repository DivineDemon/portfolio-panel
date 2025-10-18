import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import CaseStudies from "./pages/case-studies";
import Companies from "./pages/companies";
import Dashboard from "./pages/dashboard";
import Projects from "./pages/projects";
import Testimonials from "./pages/testimonials";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Route>
    </Routes>
  );
};

export default App;
