import "./index.css";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log(localStorage.getItem("email"));
    if (localStorage.getItem("email") !== null) {
      navigate("/", { replace: true });
    }
  }, []);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log({ name, email, password, confirmPassword });
    if (name === "") {
      seterrorMsg("Required Name Fiels");
    } else if (email === "") {
      seterrorMsg("Required Email Fiels");
    } else if (password === "") {
      seterrorMsg("Required password Field");
    } else if (confirmPassword === "") {
      seterrorMsg("Required  conform password Field");
    } else if (password !== confirmPassword) {
      seterrorMsg("Confirm password  should match password");
    } else {
      let usersList = JSON.parse(localStorage.getItem("Users")) || [];
      const newUser = {
        name: name,
        email: email,
        password: password,
      };
      let updatedUser = [...usersList, newUser];

      seterrorMsg("Successfuly Registered");
      localStorage.setItem("Users", JSON.stringify(updatedUser));
      setTimeout(() => {
        seterrorMsg("Go to login page for login");
      }, 600);
    }
  };

  return (
    <div className="register-main-container">
      <form className="register-card" onSubmit={onSubmitForm}>
        <h1 className="register-heading">Register</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="register-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="register-input"
          value={email}
          onChange={onEmailChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="register-input"
          value={password}
          onChange={onPasswordChange}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="register-input"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <p className="error-msg">{errorMsg}</p>
        <button type="submit" className="register-button">
          Register
        </button>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
