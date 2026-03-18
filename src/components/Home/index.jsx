import "./index.css";
import { Link } from "react-router";
import Header from "../Header";
function Home() {
  const JobsList =
    JSON.parse(localStorage.getItem("jobs")) !== null
      ? JSON.parse(localStorage.getItem("jobs"))
      : [];

  let InterviewsCount = JobsList.filter((itm) =>
    itm.status.includes("Interview"),
  ).length;
  let offersCount = JobsList.filter((itm) =>
    itm.status.includes("Offer"),
  ).length;
  return (
    <div>
      <Header />
      <div className="app-container">
        <div>
          <div className="cards">
            <div className="card-inner">
              <h3>Total Applications</h3>
              <p>{JobsList.length}</p>
            </div>
            <div className="card-inner">
              <h3>Interviews</h3>
              <p>{InterviewsCount}</p>
            </div>
            <div className="card-inner">
              <h3>Offers</h3>
              <p>{offersCount}</p>
            </div>
          </div>
        </div>
        <div className="btn-nav">
          <button>
            <Link to="/createJob">Create Job Application</Link>
          </button>
          <button>
            <Link to="/jobs">View Job Application List </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
