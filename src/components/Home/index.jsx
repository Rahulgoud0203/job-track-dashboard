import "./index.css";
import { Link, useNavigate } from "react-router";
function Home() {
  const navi = useNavigate();

  return (
    <div className="app-container">
      <div>
        <div className="cards">
          <div className="card-inner">
            <h3>Total Applications</h3>
            <p>0</p>
          </div>
          <div className="card-inner">
            <h3>Interviews</h3>
            <p>0</p>
          </div>
          <div className="card-inner">
            <h3>Offers</h3>
            <p>0</p>
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
  );
}

export default Home;
