import "./index.css";
import { Link } from "react-router";
import Header from "../Header";

function Home() {
  const JobsList = JSON.parse(localStorage.getItem("jobs")) || [];

  const interviewsCount = JobsList.filter(
    (itm) => itm.status === "Interview",
  ).length;

  const offersCount = JobsList.filter((itm) => itm.status === "Offer").length;

  return (
    <div>
      <Header />

      <div className="app-container">
        <div className="cards">
          <div className="card-inner">
            <h3>Total Applications</h3>
            <p>{JobsList.length}</p>
          </div>

          <div className="card-inner">
            <h3>Interviews</h3>
            <p>{interviewsCount}</p>
          </div>

          <div className="card-inner">
            <h3>Offers</h3>
            <p>{offersCount}</p>
          </div>
        </div>

        {JobsList.length === 0 && (
          <p className="empty-msg">No applications yet </p>
        )}

        <div className="btn-nav">
          <Link to="/createJob" className="btn">
            Create Job Application
          </Link>

          <Link to="/jobs" className="btn">
            View Job Application List
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
