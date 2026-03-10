import { useState } from "react";
import { Link } from "react-router";
import "./index.css";

function ViewJobsApplications() {
  const [searchInp, setSearchInp] = useState("");
  const [JobsList, setJobsData] = useState(
    JSON.parse(localStorage.getItem("jobs")) !== null
      ? JSON.parse(localStorage.getItem("jobs"))
      : [],
  );
  const [statusFilter, setSatatusFilter] = useState("");

  const onDelete = (id) => {
    const afterDelData = JobsList.filter((itm) => itm.uniqueId !== id);
    setJobsData(afterDelData);
    localStorage.setItem("jobs", JSON.stringify(afterDelData));
  };

  const onSearch = (e) => {
    setSearchInp(e.target.value.toLowerCase());
  };
  let filtered = JobsList.filter(
    (itm) =>
      itm.company.toLowerCase().includes(searchInp) &&
      itm.status.includes(statusFilter === "All" ? "" : statusFilter),
  );

  return (
    <div className="main-container">
      <div className="card">
        <h1 className="title">Job Applications</h1>

        <Link to="/createJob">
          <button className="add-btn">Add Job</button>
        </Link>

        <div className="search-filter">
          <input
            type="text"
            placeholder="Search company or role..."
            className="search-input"
            onChange={onSearch}
          />

          <select
            className="filter-select"
            onChange={(e) => setSatatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((job) => (
              <tr key={job.uniqueId}>
                <td>{job.company}</td>
                <td>{job.role}</td>
                <td>{job.status}</td>

                <td>
                  <Link to={"/EditJob/" + job.uniqueId}>
                    <button className="edit-btn">Edit</button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(job.uniqueId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewJobsApplications;
