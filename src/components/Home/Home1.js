import React, {Component} from 'react';
import './style.css';
import photo1 from "../../Images/photo3.jpg";
import VideoPlayer from 'react-video-js-player';
import {Link} from "react-router-dom";
import {BrowserRouter as Router,Route} from "react-router-dom";
import Analyze from "../AnnotatingDisplay/Analyze";
import Complete from "../AnnotatingDisplay/Complete";
import Switch from "react-bootstrap/Switch";
import ModalVideo from 'react-modal-video'
import {Button,ButtonToolbar} from "react-bootstrap";
import {AddVideoModel} from "../videos/AddVideoModel";

class Home1 extends Component{

    constructor () {
        super()
        this.state = {
            addModalShow:false,
            video: {
                src: "http://www.example.com/path/to/video.mp4",

            }
        }

    }

    onPlayerReady(player){
        console.log("Player is ready: ", player);
        this.player = player;
    }

    onVideoPlay(duration){
        console.log("Video played at: ", duration);
    }

    onVideoPause(duration){
        console.log("Video paused at: ", duration);
    }

    onVideoTimeUpdate(duration){
        console.log("Time updated: ", duration);
    }

    onVideoSeeking(duration){
        console.log("Video seeking: ", duration);
    }

    onVideoSeeked(from, to){
        console.log(`Video seeked from ${from} to ${to}`);
    }

    onVideoEnd(){
        console.log("Video ended");
    }


    render() {

        let addModalClose=()=>this.setState({addModalShow:false})
        return(
            <div className="container">
                <div>
                    <div className="container" id="categoriesHome">
                        <div className="row">
                            <div className="col-lg-6 aos-init aos-animate" data-aos="zoom-in">
                                <div className="content pt-4 pt-lg-0">
                                    <VideoPlayer
                                        controls={true}
                                        src={this.state.video.src}
                                        poster={this.state.video.poster}
                                        width="500px"
                                        height="300px"
                                        onReady={this.onPlayerReady.bind(this)}
                                        onPlay={this.onVideoPlay.bind(this)}
                                        onPause={this.onVideoPause.bind(this)}
                                        onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
                                        onSeeking={this.onVideoSeeking.bind(this)}
                                        onSeeked={this.onVideoSeeked.bind(this)}
                                        onEnd={this.onVideoEnd.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 d-flex flex-column justify-contents-center aos-init aos-animate"
                                 data-aos="fade-left">
                                <div className="content pt-4 pt-lg-0">
                                    <h3>Learn more about CSAAT - Video Analysis Tool</h3>
                                    <ul>
                                        <li><i className="icofont-check-circled">How we collect Data?</i><br/>
                                            The child’s video data will be collected by doing in room
                                            activities done by according to the script written by professionals.
                                            All the videos will be recorded with high quality and 360 degrees
                                        </li><br/>
                                        <li><i className="icofont-check-circled">Who will be Analyzing and Annotating it?</i><br/>
                                            Health Professionals will only have access to annotate a video.
                                        </li><br/>
                                        <li><i className="icofont-check-circled">What will be the outcome?</i><br/>
                                            Generate folder structure with videos annotations for a particular child's video.
                                        </li><br/>
                                        <li><i className="icofont-check-circled">What will be the Outcome of this overall project?</i><br/>
                                            Detect and generate a report, whether the child has autism or not.
                                        </li><br/>
                                    </ul>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div>

                    <div className="container" id="section3">
                        <div className="section-title aos-init aos-animate" data-aos="fade-up">
                            <div className="container">
                                <div className="row aos-init aos-animate" data-aos="zoom-in">
                                    <div className="col-lg-9 text-center text-lg-left">
                                        <h3>Category</h3>
                                        <p> Categorizing the Video Annotations into 3 Categories.
                                            All the categories are managed only by Level-1 health professionals</p>
                                    </div>
                                    <div className="col-lg-3 cta-btn-container text-center">
                                        <button id="button4" onClick={()=>this.setState({addModalShow:true})}>Watch Demo</button>

                                        <AddVideoModel
                                        show={this.state.addModalShow}
                                        onHide={addModalClose}
                                        />

                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="row">
                            <div
                                className="col-md-6 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0 aos-init aos-animate"
                                data-aos="zoom-in">
                                <div className="icon-box">
                                    <div className="icon"><i className="bx bxl-dribbble"></i></div>
                                    <h4 className="title"><Link to="/categoriesm"  style={{  textDecoration: 'none' }}>Level 1 Category</Link></h4>
                                    <p className="description">A video can have a 2 or more main categories</p>
                                </div>
                            </div>

                            <div
                                className="col-md-6 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0 aos-init aos-animate"
                                data-aos="zoom-in" data-aos-delay="100">
                                <div className="icon-box icon-box-cyan">
                                    <div className="icon"><i className="bx bx-file"></i></div>
                                    <h4 className="title"><Link to="/categoriessub"  style={{  textDecoration: 'none' }}>Level 2 Category</Link></h4>
                                    <p className="description">A trimmed video under a main category can have a 2 or more subcategories</p>
                                </div>
                            </div>

                            <div
                                className="col-md-6 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0 aos-init aos-animate"
                                data-aos="zoom-in" data-aos-delay="200">
                                <div className="icon-box icon-box-green">
                                    <div className="icon"><i className="bx bx-tachometer"></i></div>
                                    <h4 className="title"><Link to="/categorieslevel"  style={{  textDecoration: 'none' }}>Level 3 Category</Link></h4>
                                    <p className="description">A trimmed video under a main-sub category has a 2 or more level 3 categories</p>
                                </div>
                            </div>

                            <div className="container">
                                <div id="categoriesHome">
                                <div className="row aos-init aos-animate" data-aos="zoom-in">
                                    <div className="col-lg-9 text-center text-lg-left">
                                        <h3>Annotate</h3>
                                        <div className="row">
                                            <div
                                                className="col-md-3 col-lg-5 d-flex align-items-stretch mb-5 mb-lg-0 aos-init aos-animate"
                                                data-aos="zoom-in" data-aos-delay="100">
                                                <div className="icon-box icon-box-cyan">
                                                    <div className="icon"><i className="bx bx-file"></i></div>
                                                    <h4 className="title">Yet to be Annotated Videos</h4>
                                                    <p className="description">xxxxxxxxxxxxxxx</p>
                                                </div>
                                            </div>

                                            <div
                                                className="col-md-3 col-lg-5 d-flex align-items-stretch mb-5 mb-lg-0 aos-init aos-animate"
                                                data-aos="zoom-in" data-aos-delay="200">
                                                <div className="icon-box icon-box-green">
                                                    <div className="icon"><i className="bx bx-tachometer"></i></div>
                                                    <h4 className="title">Annotation Completed Videos</h4>
                                                    <p className="description">xxxxxxxxxxxxxxxxxxxxxxxxx</p>
                                                </div>
                                            </div>

                                        <br/><br/>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 cta-btn-container text-center">
                                        <button className="videonavmainbtn"><Link to="/annotate"  style={{  textDecoration: 'none' }}>Go to Page</Link></button>
                                        <button id="button4">Watch Demo</button>
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        );
    }

}
export default Home1;
