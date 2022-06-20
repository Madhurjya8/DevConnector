import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import EditExperience from "./components/profile-forms/EditExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import EditEducation from "./components/profile-forms/EditEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/layout/NotFound";
import PrivateRoute from "./components/routing/PrivateRoute";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import { LOGOUT } from "./actions/types";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

const App = () => {
  useEffect(() => {
    // check for token in LocalStorage when app first runs; if there is a token set axios headers for all requests
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="create-profile"
            element={
              <PrivateRoute>
                <CreateProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="add-experience"
            element={
              <PrivateRoute>
                <AddExperience />
              </PrivateRoute>
            }
          />
          <Route
            path="edit-experience/:expId"
            element={
              <PrivateRoute>
                <EditExperience />
              </PrivateRoute>
            }
          />
          <Route
            path="add-education"
            element={
              <PrivateRoute>
                <AddEducation />
              </PrivateRoute>
            }
          />
          <Route
            path="edit-education/:eduId"
            element={
              <PrivateRoute>
                <EditEducation />
              </PrivateRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <Posts />
              </PrivateRoute>
            }
          />
          <Route
            path="/posts/:postId"
            element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};
export default App;
