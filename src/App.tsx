import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
