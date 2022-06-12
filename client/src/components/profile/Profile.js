import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getProfileByUserId } from "../../actions/profile";

const Profile = (props) => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.profile);
  const authState = useSelector((state) => state.auth);

  const { userId } = useParams();

  useEffect(() => {
    dispatch(getProfileByUserId(userId));
  }, [userId, dispatch]);

  return <section className="container">Profile</section>;
};

export default Profile;
