import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import "./style.css";

class Annotatemain extends Component{

    render() {
        return(
            <div><br/>   <br/>   <br/>   <br/>   <br/>
                <h1 align="center">Annotate</h1>

                <div id="addmaincat">
                    <div>
                        <br/>
                        <h3 align="center" id="headingSub">Yet to be Annotated Videos</h3>
                    </div>
                    <div align="center">

                        <br/><br/><br/>
                    </div>
                </div>

                <div id="addmaincat">
                    <div>
                        <br/>
                        <h3 align="center" id="headingSub">Annotation Completed Videos</h3>
                    </div>
                    <div align="center">

                        <br/><br/><br/>
                    </div>
                </div>





            </div>
        );
    }

}
export default Annotatemain;
