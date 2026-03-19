import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import AddJob from "./components/AddJob";
import ViewJobsApplications from "./components/ViewJobsApplications";
import EditJob from "./components/EditJob";
import ProtectedRoute from "./components/ProtectedRoute";

import { useEffect } from "react";

import ThemeContext from "./context/ThemeContext";
import { useState } from "react";
function App() {
  const [theme, setTheme] = useState();
  const changeTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <BrowserRouter>
      <ThemeContext value={{ theme, changeTheme }}>
        <div className={!theme ? "light" : "dark"}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/createJob"
              element={
                <ProtectedRoute>
                  <AddJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <ViewJobsApplications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/EditJob/:id"
              element={
                <ProtectedRoute>
                  <EditJob />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </ThemeContext>
    </BrowserRouter>
  );
}

export default App;
