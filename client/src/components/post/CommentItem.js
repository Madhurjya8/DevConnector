import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";

const CommentItem = (props) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { _id, text, name, avatar, user, date } = props.comment;
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!authState.loading && user === authState.user._id && (
          <React.Fragment>
            <button
              onClick={(e) => dispatch(deleteComment(props.postId, _id))}
              className="btn btn-delete"
            >
              <i className="fas fa-trash"></i>
            </button>
            <button className="btn">
              <i className="fas fa-edit"></i>
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
