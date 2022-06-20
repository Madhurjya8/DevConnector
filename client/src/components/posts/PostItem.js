import React, { useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Spinner from "../layout/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike, deletePost, editPost } from "../../actions/post";

const PostItem = (props) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { _id, user, text, name, avatar, date, likes, comments } = props.post;

  const [postText, setPostText] = useState(text);
  const [editMode, setEditMode] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setEditMode(false);
    dispatch(editPost({ text: postText }, _id));
  };

  return props.loading ? (
    <Spinner />
  ) : (
    <div className="post bg-light my-1 p-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt={name} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        {!editMode ? (
          <React.Fragment>
            <p className="my-1">{text}</p>
            <p className="post-date">
              Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            <button
              onClick={(e) => dispatch(addLike(_id))}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up"></i>{" "}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              onClick={() => dispatch(removeLike(_id))}
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!authState.loading && user === authState.user._id && (
              <React.Fragment>
                <button
                  onClick={() => dispatch(deletePost(_id))}
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
              onChange={(e) => setPostText(e.target.value)}
              value={postText}
            />
            <button type="submit" className="btn btn-success">
              <i className="fas fa-check" />
            </button>
            <button
              onClick={() => {
                setPostText(text);
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

export default PostItem;
