import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import "./style.css";
import Analyze from "./Analyze";
import Complete from "./Complete";

class Annotatemain extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return(
            <div><br/>   <br/>   <br/>   <br/>   <br/>
                <h1 align="center">Annotate</h1>

                <div id="addmaincat4">
                    <div className="container">
                    <div className="sizecontainer">
                        <br/>
                        <h3 align="center" id="headingSub">Yet to be Annotated Videos</h3>
                        <Analyze/>
                    </div></div>
                    <div align="center">
                        <br/><br/><br/>
                    </div>
                </div>

                <div id="addmaincat3">
                    <div className="container">
                        <div className="sizecontainer">
                    <div>
                        <br/>
                        <h3 align="center" id="headingSub">Annotation Completed Videos</h3>
                        <Complete/>
                    </div>
                    <div align="center">

                        <br/><br/><br/>
                    </div></div></div>
                </div>





            </div>
        );
    }

}
export default Annotatemain;
