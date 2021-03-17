import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import './style.css';
import axios from "axios";
import PropTypes from "prop-types";


class AnnotateVideo extends Component {

    static get propTypes() {
        return {
            id: PropTypes.number,
            name: PropTypes.string,
            url: PropTypes.string

        }
    }

    constructor(props) {
        super(props);
        this.state = {
            url:this.props.url,
            name:this.props.name,
            id:this.props.id,
        }

        //alert(this.state.url)

       /* this.state.name=this.props.name;
        this.state.id=this.props.id;
        this.state.url=this.props.url;*/



    }

    render() {
        let {name} = this.state;
        let {id} = this.state;
        let {url} = this.state;
        return (
            <div>
                Video id:{id} Video Name:{name}
                    <div>
                        <div>
                        <ReactPlayer
                            controls={true}
                            url={url}
                            poster={this.state.name}
                            width="400px"
                            height="250px"
                        />
                        <div><br/>
                            Chlid Specification
                            <button className="videonavmainbtn" style={{  textDecoration: 'none' }}> <Link to={"/annotateVideo/id?_k=" +id }> Annotate </Link></button>
                        </div><br/><br/>
                        </div>
                    </div>

            </div>
        );
    }

    gotoAnnotation() {

    }


}

export default AnnotateVideo;
