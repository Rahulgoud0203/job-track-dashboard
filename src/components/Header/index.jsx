import { useEffect, useState } from "react";
import "./index.css";
import { useNavigate, Link, useLocation } from "react-router";
import Cookies from "js-cookie";
function Header() {
  let data;
  const [login, setLogin] = useState(false);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (Cookies.get("email_token") !== undefined) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [location]);
  const onLogOut = () => {
    Cookies.remove("email_token");
    setLogin(false);
  };
  const onLogIn = () => {
    nav("/login");
  };

  return (
    <div>
      <div className="header-cnt">
        <div className="logo-cnt">
          <Link to="/" className="link-btn">
            <h1>Job Tracker Dashboard</h1>
          </Link>
        </div>
        <div className="Update-icons">
          <div className="profile-details">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="66"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 18 18"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
            {login ? (
              <h5>
                hello!
                <br /> {JSON.parse(Cookies.get("email_token"))}
              </h5>
            ) : (
              ""
            )}
            {login ? (
              <button onClick={onLogOut}>LogOut</button>
            ) : (
              <button onClick={onLogIn}>Log In</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
