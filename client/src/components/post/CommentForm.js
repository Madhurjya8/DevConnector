import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = (props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addComment(props.postId, { text }));
    setText("");
  };

  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={submitHandler}>
        <textarea
          ols="30"
          rows="5"
          placeholder="Create a post"
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>
        <input type="submit" value="Submit" className="btn btn-dark my-1" />
      </form>
    </div>
  );
};

export default CommentForm;
