import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Navigate, useNavigate } from "react-router";
function EditJob() {
  const navigate = useNavigate();
  if (localStorage.getItem("email") === null) {
    return <Navigate to="/login" />;
  }

  const { id } = useParams();
  let JobsList = JSON.parse(localStorage.getItem("jobs")) || [];

  const jobEdit = JobsList.find((itm) => itm.uniqueId === id);

  const [company, setCompany] = useState(jobEdit.company);
  const [role, setRole] = useState(jobEdit.role);
  const [status, setStatus] = useState(jobEdit.status);

  const onUpdate = (event) => {
    event.preventDefault();
    if (localStorage.getItem("email") === null) {
      navigate("/login", { replace: true });
    } else {
      const updatedJob = JobsList.map((itm) =>
        itm.uniqueId === id
          ? { ...itm, company: company, role: role, status: status }
          : itm,
      );

      localStorage.setItem("jobs", JSON.stringify(updatedJob));
      navigate("/jobs");
    }
  };
  return (
    <div className="main-container">
      <div className="card">
        <h1 className="title">Edit Job Application</h1>

        <form onSubmit={onUpdate}>
          <input
            className="input"
            placeholder="Company Name"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />

          <input
            className="input"
            placeholder="Job Role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />

          <select
            className="input"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>

          <button className="btn">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;
