import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { loadUser } from "../../actions/auth";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { batch } from "react-redux";
import Alert from "../layout/Alert";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const { profile, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    batch(() => {
      dispatch(loadUser());
      dispatch(getCurrentProfile());
    });
  }, [dispatch]);

  return (
    <section className="container">
      <Alert />
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {(userLoading || profileLoading) && <Spinner />}
      {!profileLoading &&
        (profile === null ? (
          <React.Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DashboardActions />
            {profile.experience && profile.experience.length > 0 && (
              <Experience experience={profile.experience} />
            )}
            {profile.education && profile.education.length > 0 && (
              <Education education={profile.education} />
            )}

            <div className="my-2">
              <button
                onClick={() => dispatch(deleteAccount())}
                className="btn btn-danger"
              >
                <i className="fas fa-user-minus"></i> Delete My Account
              </button>
            </div>
          </React.Fragment>
        ))}
    </section>
  );
};

export default Dashboard;
