import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import AddJob from "./components/AddJob";
import ViewJobsApplications from "./components/ViewJobsApplications";
import EditJob from "./components/EditJob";
import Header from "./components/Header";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createJob" element={<AddJob />} />
          <Route path="/jobs" element={<ViewJobsApplications />} />
          <Route path="/EditJob/:id" element={<EditJob />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
