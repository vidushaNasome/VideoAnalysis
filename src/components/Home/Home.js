import React, {Component} from 'react';
import './style.css';
import photo1 from "../../Images/photo3.jpg";
import {Link} from "react-router-dom";
import Home1 from "./Home1";
import userimg from "../../Images/user.png";
import VideoPlayer from "react-video-js-player";

class Home extends Component{

    render() {
        return(
            <div>
            <div className="container" id="xx">
                <div className="row">
                    <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center"
                         data-aos="fade-up">
                        <div>
                            <div id="tt">We create our tool to automatically detect symptoms Autism in
                                an uploaded children’s video by using the latest
                                Artificial Intelligence and Machine Learning technologies
                                which will  gather data collection, by video recordings and
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
                {sessionStorage.getItem("Position") !== "Health Professional"?
                    <div>
                        <div className="container" id="categoriesHome">
                            <div className="row">
                                <div className="col-lg-6 aos-init aos-animate" data-aos="zoom-in">
                                    <div className="content pt-4 pt-lg-0">
                                        <VideoPlayer
                                            controls={true}
                                            src={'yy'}
                                            width="500px"
                                            height="300px"

                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex flex-column justify-contents-center aos-init aos-animate"
                                     data-aos="fade-left">
                                    <div className="content pt-4 pt-lg-0">
                                        <h3>Learn more about CSAAT - Video Analysis Tool</h3>
                                        <ul>
                                            <li><i className="icofont-check-circled">How we collect Data?</i><br/>
                                            The child’s video will be collected after conducting in-room activities
                                                followed according to a script provided by professionals.
                                            </li><br/>
                                            <li><i className="icofont-check-circled">Who will be Analyzing and Annotating it?</i><br/>
                                                Health Professionals will only have access to annotate a video.
                                            </li><br/>
                                            <li><i className="icofont-check-circled">What will be the outcome?</i><br/>
                                                Generate folder structure with videos annotations for a particular child's video.
                                            </li><br/>
                                            <li><i className="icofont-check-circled">What will be the Outcome of this overall project?</i><br/>
                                                The system will generate a report which
                                                will includes if the child shows symptoms of Autism Spectrum Disorder or not.
                                            </li><br/>
                                        </ul>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    :<div>
                    </div>}
            </div>
        );
    }

}
export default Home;
