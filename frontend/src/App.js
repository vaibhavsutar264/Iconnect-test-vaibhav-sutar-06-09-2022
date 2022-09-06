import './App.css';
import Navbar from './component/hambergermenu/Navbar';
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home"
import {BrowserRouter as Router, Switch,  Route} from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
import React from "react";
import LoginSignUp from "./component/User/LoginSignUp";
import Logout from "./component/User/Logout";
import Profile from "./component/User/Profile";
import ProtectedRoute from './component/Route/ProtectedRoute';
import NotFound from "./component/layout/NotFound/NotFound";


function App() {
  return (
    <Router>
      <Navbar />
    {/* // <Routes> */}


    <Switch>
    <Route exact path='/' component={Home} />
    <ProtectedRoute exact path='/account' component={Profile} />
    <Route exact path='/login' component={LoginSignUp} />
    <Route exact path='/logout' component={Logout} />
        <Route
          component={NotFound}
        />
    </Switch>
    {/* // </Routes> */}
    <Footer/>
    </Router>
  )
}

export default App;
