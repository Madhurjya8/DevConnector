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

  const rootComments = post?.comments.filter(
    (comment) => comment.parentId === null
  );

  const getReplies = (commentId) =>
    post.comments
      .filter((comment) => comment.parentId === commentId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
        {rootComments.map((rootComment) => (
          <CommentItem
            key={rootComment._id}
            comment={rootComment}
            postId={post._id}
            loading={loading}
            replies={getReplies(rootComment._id)}
            isReply={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Post;
