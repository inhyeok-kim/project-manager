import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/root/Login";
import Chat from "./views/root/Chat";
import Dashboard from "./views/root/Dashboard";
import Project from "./views/root/project/Project";
import Regist from "./views/root/project/ProjectRegist";
import Root from "./views/root/Root";
import Schedule from "./views/root/Schedule";
import Tasks from "./views/root/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Root />} >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="project/regist" element={<Regist />} />
          <Route path="project" element={<Project />} >
            <Route path=":projectId" element={<Project />} />
          </Route>
          <Route path="schedule" element={<Schedule />} />
          <Route path="chat" element={<Chat />} />
          <Route path="tasks" element={<Tasks />} />
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
