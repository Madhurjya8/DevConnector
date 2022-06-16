import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { deleteComment, editComment } from "../../actions/post";

const CommentItem = (props) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { _id, text, name, avatar, user, date } = props.comment;

  const [commentText, setCommentText] = useState(text);
  const [editMode, setEditMode] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setEditMode(false);
    dispatch(editComment({ text: commentText }, props.postId, _id));
  };

  return props.loading ? (
    <Spinner />
  ) : (
    <div className="comment bg-white p-1 my-1">
      <div className="photoname">
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        {!editMode ? (
          <React.Fragment>
            <p className="my-1">{text}</p>
            <p className="comment-date">
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
                <button onClick={() => setEditMode(true)} className="btn">
                  <i className="fas fa-edit"></i>
                </button>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <form className="form my-1" onSubmit={submitHandler}>
            <textarea
              className="post-textarea"
              cols="30"
              rows="5"
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
            />
            <button type="submit" className="btn btn-success">
              <i className="fas fa-check" />
            </button>
            <button
              onClick={() => {
                setCommentText(text);
                setEditMode(false);
              }}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
