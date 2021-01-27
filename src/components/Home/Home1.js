import React, {Component} from 'react';
import './style.css';
import photo1 from "../../Images/photo3.jpg";
import {Link} from "react-router-dom";
import {BrowserRouter as Router,Route} from "react-router-dom";
import Analyze from "../Annotating/Analyze";
import Complete from "../Annotating/Complete";
import Switch from "react-bootstrap/Switch";

class Home1 extends Component{

    render() {
        return(
            <div className="container">
                <p>Home 1</p>
                {/*<Router>
                    <Route  path="/annotateNotComplete"  component={Analyze}/>
                    <Route  path="/annotateComplete"  component={Complete}/>
                </Router>*/}
            </div>
        );
    }

}
export default Home1;
