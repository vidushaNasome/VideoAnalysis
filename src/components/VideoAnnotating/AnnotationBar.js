import React, {Component} from 'react';
import "./style.css";
import Timeline from "./Timeline";

class AnnotationBar extends Component {
    render() {
        return (
            <div className="annotation">
                <Timeline/>
            </div>
        );
    }
}

export default AnnotationBar;
