import { useState, useEffect } from "react";
import "./index.css";
import Header from "../Header";

const AddJob = () => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [Msg, seterrorMsg] = useState("");
  const [companyName, setcompantName] = useState("");
  const jobList = JSON.parse(localStorage.getItem("jobs")) || [];

  const onSearchCompany = async () => {
    const apiUrl = `https://api.agify.io/?name=${company}`;
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    console.log(responseData);
  };

  const addJob = (event) => {
    event.preventDefault();

    // console.log(company, role, status);

    let newJob = {
      uniqueId: new Date(),
      company: company,
      role: role,
      status: status,
    };
    let updatedJob = [...jobList, newJob];
    localStorage.setItem("jobs", JSON.stringify(updatedJob));
    seterrorMsg(`Successfully added  company:${company} role: ${role}`);
  };

  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="card">
          <h1 className="title">Add Job Application</h1>

          <form onSubmit={addJob}>
            <input
              className="input"
              placeholder="Company Name"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
            <button type="button" onClick={onSearchCompany}>
              Search
            </button>

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

            <button className="btn">Add Job</button>
          </form>
          <p className="error-msg">{Msg}</p>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
