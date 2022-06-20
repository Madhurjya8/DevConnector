import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
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

  return (
    <section className="container">
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {authState.isAuthenticated &&
            authState.loading === false &&
            authState.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <React.Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </React.Fragment>
              ) : (
                <h4>No Experience Credetials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <React.Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </React.Fragment>
              ) : (
                <h4>No Education Credetials</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </React.Fragment>
      )}
    </section>
  );
};

export default Profile;
