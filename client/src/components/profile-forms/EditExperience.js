import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editExperience, getCurrentProfile } from "../../actions/profile";
// import Moment from "react-moment";
import moment from "moment";
import Alert from "../layout/Alert";

const EditExperience = () => {
  const navigate = useNavigate();

  const loc = useLocation();
  const { expId } = loc.state;

  const profileState = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const { profile, loading } = profileState;
  const experienceArr = profile.experience;

  const experience = experienceArr.find((exp) => exp._id === expId);

  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: moment().format("YYYY-MM-DD"),
    to: moment().format("YYYY-MM-DD"),
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !experience ? "" : experience.company,
      title: loading || !experience ? "" : experience.title,
      location: loading || !experience ? "" : experience.location,
      from:
        loading || !experience
          ? ""
          : moment(experience.from).format("YYYY-MM-DD"),
      to:
        loading || !experience || !experience.to
          ? ""
          : moment(experience.to).format("YYYY-MM-DD"),
      current: loading || !experience ? "" : experience.current,
      description: loading || !experience ? "" : experience.description,
    });
  }, [loading]);

  const { company, title, location, from, to, current, description } = formData;

  const changeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editExperience(formData, expId, navigate));
  };

  return (
    <section className="container">
      <Alert />
      <h1 className="large text-primary">Edit Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
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
            Current Job
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
            placeholder="Job Description"
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

export default EditExperience;
