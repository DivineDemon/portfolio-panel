import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import Projects from "./pages/projects";
import Testimonials from "./pages/testimonials";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Route>
    </Routes>
  );
};

export default App;
