import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Project from "./views/Project";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="project" element={<Project />} >
          <Route path=":number" element={<Project/>} />
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
