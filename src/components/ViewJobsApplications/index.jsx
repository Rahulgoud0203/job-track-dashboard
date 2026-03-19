import { useState } from "react";
import { Link } from "react-router";
import "./index.css";
import Header from "../Header";

function ViewJobsApplications() {
  const [searchInp, setSearchInp] = useState("");
  const [jobsList, setJobsList] = useState(
    JSON.parse(localStorage.getItem("jobs")) || []
  );
  const [statusFilter, setStatusFilter] = useState("All");

  
  const onDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    const updated = jobsList.filter((itm) => itm.uniqueId !== id);
    setJobsList(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));
  };

  
  const filtered = jobsList.filter((itm) => {
    const searchMatch =
      itm.company.toLowerCase().includes(searchInp) ||
      itm.role.toLowerCase().includes(searchInp);

    const statusMatch =
      statusFilter === "All" || itm.status === statusFilter;

    return searchMatch && statusMatch;
  });


  const sortedJobs = [...filtered].sort(
    (a, b) => b.uniqueId - a.uniqueId
  );

  return (
    <div>
      <Header />

      <div className="main-container">
        <div className="card">
          <h1 className="title">Job Applications</h1>

          <Link to="/createJob" className="add-btn">
            Add Job
          </Link>

          <div className="search-filter">
            <input
              type="text"
              placeholder="Search company or role..."
              className="search-input"
              onChange={(e) =>
                setSearchInp(e.target.value.toLowerCase())
              }
            />

            <select
              className="filter-select"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>


          {sortedJobs.length === 0 ? (
            <div className="empty-state">
              <h2> No Jobs Yet</h2>
              <p>Start tracking your job applications!</p>
              <Link to="/createJob" className="add-btn">
                Add Your First Job
              </Link>
            </div>
          ) : (
            <div className="jobs-list">
              {sortedJobs.map((job) => (
                <div key={job.uniqueId} className="job-card">
                  
                  <div className="job-left">
                    <h3>{job.company}</h3>
                    <p>{job.role}</p>
                  </div>

                  <div className="job-middle">
                    <span
                      className={`status ${job.status.toLowerCase()}`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="job-right">
                    <Link
                      to={`/EditJob/${job.uniqueId}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => onDelete(job.uniqueId)}
                    >
                      Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewJobsApplications;