import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Alert from "../layout/Alert";
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { getPost } from "../../actions/post";

const Post = (props) => {
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.post);
  const { postId } = useParams();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <div className="container">
      <Alert />
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>

      <PostItem post={post} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Post;
