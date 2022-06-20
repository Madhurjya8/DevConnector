import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import Alert from "../layout/Alert";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const changeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login({ email, password }, navigate));
  };

  // Redirect if user is authenticated
  // if (isAuthenticated) {
  //   navigate("/dashboard");
  // }

  return (
    <section className="container">
      <Alert />

      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={changeHandler}
          />
        </div>

        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

export default Login;
