import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editEducation, getCurrentProfile } from "../../actions/profile";
// import Moment from "react-moment";
import moment from "moment";
import Alert from "../layout/Alert";

const EditEducation = () => {
  const navigate = useNavigate();

  const loc = useLocation();
  const { eduId } = loc.state;

  const profileState = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const { profile, loading } = profileState;
  const educationArr = profile.education;

  const education = educationArr.find((edu) => edu._id === eduId);

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: moment().format("YYYY-MM-DD"),
    to: moment().format("YYYY-MM-DD"),
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      school: loading || !education ? "" : education.school,
      degree: loading || !education ? "" : education.degree,
      fieldofstudy: loading || !education ? "" : education.fieldofstudy,
      from:
        loading || !education
          ? ""
          : moment(education.from).format("YYYY-MM-DD"),
      to:
        loading || !education || !education.to
          ? ""
          : moment(education.to).format("YYYY-MM-DD"),
      current: loading || !education ? "" : education.current,
      description: loading || !education ? "" : education.description,
    });
  }, [loading]);

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const changeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editEducation(formData, eduId, navigate));
  };

  return (
    <section className="container">
      <Alert />
      <h1 className="large text-primary">Edit Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={changeHandler}
          />
        </div>

        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData((prevFormData) => {
                  return { ...prevFormData, current: !prevFormData.current };
                });
                toggleDisabled((prevToDateDisabled) => !prevToDateDisabled);
              }}
            />{" "}
            Current School
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={changeHandler}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={description}
            onChange={changeHandler}
            cols="30"
            rows="5"
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

export default EditEducation;
