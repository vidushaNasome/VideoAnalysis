import React, {Component} from 'react';
import './style.css';
import photo1 from "../../Images/photo3.jpg";
import {Link} from "react-router-dom";

class Home extends Component{

    render() {
        return(
            <div className="container" id="xx">
                <div className="row">
                    <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center"
                         data-aos="fade-up">
                        <div>
                            <h1>We Analyze your child's video to detect Austism based on the behaviour of your child</h1>
                            <h2>Catorgorized it into different categories by our Health Professionals</h2>

                            <Link to="/searchandretrive" id="homebtnid" style={{  textDecoration: 'none' }} >Go to Search Page</Link>
                        </div>
                    </div>
                    <div id="homedetails" className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left">
                        <img src={photo1} className="img-fluid" alt=""/>

                    </div>

                </div>
            </div>
        );
    }

}
export default Home;
