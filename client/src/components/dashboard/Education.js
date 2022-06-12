import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEducation } from "../../actions/profile";

const Education = (props) => {
  const dispatch = useDispatch();
  const educations = props.education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{""}
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteEducation(edu._id))}
          className="btn btn-delete"
        >
          <i className="fas fa-trash"></i>
        </button>
        <Link to={"/edit-education"} state={{ eduId: edu._id }} className="btn">
          <i className="fas fa-edit"></i>
        </Link>
      </td>
    </tr>
  ));

  return (
    <React.Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </React.Fragment>
  );
};

export default Education;
