import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = (props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addPost({ text }));
    setText("");
  };

  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Say something...</h3>
      </div>
      <form className="form my-1" onSubmit={submitHandler}>
        <textarea
          cols="30"
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

export default PostForm;
