import React, {Component} from 'react';
import './style.css';
import photo1 from "../../Images/photo3.jpg";
import {Link} from "react-router-dom";
import Home1 from "./Home1";
import userimg from "../../Images/user.png";

class Home extends Component{

    render() {
        return(
            <div>
            <div className="container" id="xx">
                <div className="row">
                    <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center"
                         data-aos="fade-up">
                        <div>
                            <div id="tt">We create our tool to automatically detect Autism in
                                an uploaded children’s video by using the latest
                                Artificial Intelligence and Machine Learning technologies
                                which will be gather data collection, by video recordings and
                                annotating videos based on the categories by professional health
                                users.</div>
                            {/*<Link to="/searchandretrive" id="homebtnid" style={{  textDecoration: 'none' }} >Go to Search Page</Link>*/}
                        </div>
                    </div>
                    <div id="homedetails" className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left">
                        <img src={photo1} className="img-fluid" alt=""/>

                    </div>

                </div>

            </div>
                {sessionStorage.getItem("Position") === "Health Professional"?
                    <div>

                        <Home1/>
                    </div>
                    :<div>
                    </div>}
            </div>
        );
    }

}
export default Home;
