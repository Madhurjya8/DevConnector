import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteExperience } from "../../actions/profile";

const Experience = (props) => {
  const dispatch = useDispatch();
  const experiences = props.experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{""}
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteExperience(exp._id))}
          className="btn btn-delete"
        >
          <i className="fas fa-trash"></i>
        </button>

        <Link to={`/edit-experience/${exp._id}`} className="btn">
          <i className="fas fa-edit"></i>
        </Link>
      </td>
    </tr>
  ));

  return (
    <React.Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </React.Fragment>
  );
};

export default Experience;
