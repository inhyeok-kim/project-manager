import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./views/root/Dashboard";
import Project from "./views/root/Project";
import Root from "./views/root/Root";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="project" element={<Project />} >
            <Route path=":projectId" element={<Project />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
