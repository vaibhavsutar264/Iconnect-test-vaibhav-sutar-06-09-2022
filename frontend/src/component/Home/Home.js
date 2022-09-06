import React, { Fragment} from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Home = () => {


  return (
        <Fragment>
          <MetaData title="iConnect - iConnect Solutions Homepage" />
          <div className="banner">
          <video
                    id="scroll-video"
                    src={
                        "./bg-video.mp4"
                    }
                    type="video/mp4"
                    autoPlay
                    muted
                    loop
                ></video>
                <div className='content'>
            <h2>Iconnect</h2>
            <Link to="/login">
            <button className="Shop-Now-button">Login / Sign Up</button>
            </Link>
            </div>
          </div>
        </Fragment>
  );
};

export default Home;
