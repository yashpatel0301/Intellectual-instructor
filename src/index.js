import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterPage from "views/RegisterPage/RegisterPage.js";
import RegisterPage2 from "views/RegisterPage/RegisterPage2.js";
import AboutUs from "views/Components/AboutUs/AboutUs.js";
import { AuthProvider } from "views/Components/auth.js";
import App from "./views/Components/Dashboard.js";
import PrivateRoute from "views/Components/PrivateRoute.js";
import Dashboard from "./views/Components/Dashboard";
import ForgotPassword from "./views/Components/ForgotPassword.js";
import InstructorFilters from "./views/Components/InstructorFilters.js";
import InstructorBio from "./views/Components/Instructorbio.js"
import Instructordashboard from "./views/Components/Instructordashboard.js";
import Accountandsettings from "./views/Components/Accountandsettings.js";
import Accountandsettingsstudent from "./views/Components/Accountandsettingsstudent.js";
import Profile from "./views/Components/Profile";
import Videos from "./views/Components/Videos";
import Searchresults from "./views/Components/Searchresults";
import Blogs from "./views/Components/Blogs";
import Blogs2 from "./views/Components/Blogs2";
import CurrentInstructor from "./views/Components/CurrentInstructor";
import VideoRefer from "./views/Components/VideoRefer";
import ChatRoom from "./views/Components/ChatRoom";

var hist = createBrowserHistory();

ReactDOM.render(
  <AuthProvider>
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/Register-page" component={RegisterPage} />
      <Route path="/Register-page2" component={RegisterPage2} />
      <Route path="/AboutUs" component={AboutUs} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/blogs" component={Blogs} />
      <Route path="/blogs2" component={Blogs2} />
      <PrivateRoute path="/searchresults/:id" children={<CurrentInstructor />} />
      {/* <Route exact path="/" component={App} /> */}
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/chatroom" component={ChatRoom} />
      <PrivateRoute exact path="/instructorfilters" component={InstructorFilters} />
      <PrivateRoute exact path="/instructorbio" component={InstructorBio} />
      <PrivateRoute exact path="/instructordashboard" component={Instructordashboard} />
      <PrivateRoute exact path="/accountandsettings" component={Accountandsettings} />
      <PrivateRoute exact path="/accountandsettingsstudent" component={Accountandsettingsstudent} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/videos" component={Videos} />
      <PrivateRoute exact path="/videorefer/:id" component={VideoRefer} />
      <PrivateRoute exact path="/searchresults" component={Searchresults} />
      <Route path="/" component={Components} />
    </Switch>
  </Router>,
 </AuthProvider>,
  document.getElementById("root")
);

function  scroll() {
  setTimeout(function () {
    window.scrollTo(0,0);
  },0);
}
