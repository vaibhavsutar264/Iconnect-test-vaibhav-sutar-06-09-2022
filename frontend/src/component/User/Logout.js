import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "./logout.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon />

      <Typography>Logged Out Successfully , Please visit again </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;