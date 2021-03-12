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
            <div>
                <h1 align="center">Annotate</h1>
                <h3 align="left" id="headingSub">Yet to be Annotated Videos</h3>
                <div id="addmaincat4">
                    <div className="container">
                    <div className="sizecontainer">
                    </div></div>
                    <div align="center">
                        <br/>
                        <Analyze/>
                        <br/>
                    </div>
                </div>

                <br/>
                <h3 align="left" id="headingSub">Annotation Completed Videos</h3>
                <div id="addmaincat3">
                    <div className="container">
                        <div className="sizecontainer">
                    <div>
                    </div>
                    <div align="center">
                        <Complete/>
                        <br/> <br/> <br/> <br/>
                    </div></div></div>
                </div>





            </div>
        );
    }

}
export default Annotatemain;
