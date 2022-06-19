import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { deleteComment, editComment, replyComment } from "../../actions/post";

const CommentItem = (props) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { _id, text, name, avatar, user, date } = props.comment;

  const [commentText, setCommentText] = useState(text);
  const [replyText, setReplyText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);

  const editSubmitHandler = (e) => {
    e.preventDefault();
    setEditMode(false);
    dispatch(editComment({ text: commentText }, props.postId, _id));
  };

  const replySubmitHandler = (e) => {
    e.preventDefault();
    setReplyMode(false);
    dispatch(
      replyComment(
        props.postId,
        !!props.rootCommentId ? props.rootCommentId : _id,
        { text: replyText }
      )
    );
  };

  return props.loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <div
        className={`comment bg-white p-1 ${!props.isReply ? "my-1" : "reply"}`}
      >
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
              {!replyMode && (
                <button onClick={() => setReplyMode(true)} className="btn">
                  <i className="fas fa-reply"></i>
                </button>
              )}
            </React.Fragment>
          ) : (
            <form className="form my-1" onSubmit={editSubmitHandler}>
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
      {replyMode && (
        <form className="form my-1" onSubmit={replySubmitHandler}>
          <textarea
            className="post-textarea"
            cols="30"
            rows="5"
            onChange={(e) => setReplyText(e.target.value)}
            value={replyText}
          />
          <button type="submit" className="btn btn-success">
            <i className="fas fa-check" />
          </button>
          <button
            onClick={() => {
              setReplyText("");
              setReplyMode(false);
            }}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        </form>
      )}
      {props.replies.length > 0 && (
        <React.Fragment>
          {/* <p className="bg-primary reply-p">Replies</p> */}
          <div className="replies">
            {props.replies.map((reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                postId={props.postId}
                loading={props.loading}
                replies={[]}
                isReply={true}
                rootCommentId={_id}
              />
            ))}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CommentItem;
