import React, {Component} from 'react';
import PropTypes from "prop-types";
import video1 from "../../../Video_Store/ChildVideo1.mp4";
import "./style_l3ann.css";
import axios from "axios";
import {categoriesLevel2API, videoUploadLevelThree} from "../../../configs/config";
import ReactPlayer from "react-player";

class ViewAnnotationsLevelThree extends Component {

    static get propTypes() {
        return {
            childId: PropTypes.number,
            levelOnevideoId: PropTypes.number,
            levelTwovideoId: PropTypes.number,


        }
    }

    constructor(props) {
        super(props);

        this.state = {
            childId: this.props.childId,
            levelOnevideoId: this.props.levelOnevideoId,
            LoadedAnnotatedDetails:[],
            cat2:[]
        }
    }
    componentDidMount() {

        //loaded details for annotated videos
        axios.get(videoUploadLevelThree+"?id="+this.state.childId+'&&idlOne='+this.state.levelOnevideoId+'&&idlTwo='+this.props.levelTwovideoId)
            .then(response => {
                    this.setState({LoadedAnnotatedDetails: response.data});

                }
            )
            .catch(function (error) {
                console.log(error);


            })

        axios.get(categoriesLevel2API)
            .then(response => {
                this.setState({Cat2: response.data});
            } )
            .catch(function (error) {
                console.log(error);

            })
    }

    render() {
        let {childId} = this.state;
        let {levelOnevideoId} = this.state;
        let {LoadedAnnotatedDetails} = this.state;
        return (
            <div className="back">
                <div className="ddx">
                    <h5>View Annotations Level-3</h5><br/>
                    Unique Child Video ID: {childId}<br/>
                    Level One Annotated Video ID: {levelOnevideoId}<br/>
                    Level Two Annotated Video ID: {levelOnevideoId}<br/></div><br/>

                <div>
                    {LoadedAnnotatedDetails.map((details)=>(
                        <div>
                            <div className="ddx">
                                <div className="card text-center font-weight-bold border-warning bg-warning">
                                    <div className="card-header text-black">
                                        <div className="row">
                                            Video ID : {details.id} <br/>
                                            Annotated Level : {details.level} <br/><br/>

                                            Video ID (Unique Child's): {details.childid} <br/>
                                            Annotated Level 1 Video ID:{details.childidLevel1}<br/>
                                            Annotated Category-Level-2 ID: {details.category} <br/>
                                            Added Description : {details.description} <br/><br/>
                                            {details.video}
                                            {<ReactPlayer
                                                url={details.video}
                                                controls={true}
                                                type="video/mp4"
                                                width="600px"
                                                height="200px"
                                            />}

                                        </div></div></div><br/></div>
                        </div>
                    ))}</div>



            </div>
        );
    }
}

export default ViewAnnotationsLevelThree;
