import React, {Component} from 'react';
import PropTypes from "prop-types";
import video1 from "../../../Video_Store/ChildVideo1.mp4";
import "./style_l3ann.css";
import axios from "axios";
import {categoriesLevel3API, videoUploadLevelThree} from "../../../configs/config";
import ReactPlayer from "react-player";
import ReactTooltip from 'react-tooltip';

class ViewAnnotationsLevelThree extends Component {

    static get propTypes() {
        return {
            childId: PropTypes.number,
            levelOnevideoId: PropTypes.number,
            levelTwovideoId: PropTypes.number,
            l1category:PropTypes.number,
            l2category:PropTypes.number,


        }
    }

    constructor(props) {
        super(props);

        this.state = {
            childId: this.props.childId,
            levelOnevideoId: this.props.levelOnevideoId,
            LoadedAnnotatedDetails:[],
            Cat2:[],
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

        //alert('inside1')
        axios.get(categoriesLevel3API+'?id1='+this.props.l1category+'&&id2='+this.props.l2category)
            .then(response => {
                this.setState({Cat2: response.data});
                //alert('inside2')
            } )
            .catch(function (error) {
                console.log(error);

            })
    }

    render() {
        let {childId} = this.state;
        let {levelOnevideoId} = this.state;
        let {LoadedAnnotatedDetails} = this.state;
        let {Cat2}=this.state;
        return (
            <div className="backnew">
                <div>
                    <h5>View Annotations Level-3</h5><br/>
                    Unique Child Video ID: {childId}<br/>
                    Level One Annotated Video ID: {levelOnevideoId}<br/>
                    Level Two Annotated Video ID: {levelOnevideoId}<br/></div><br/>
                {Cat2.map((c) => (
                <div>
                    <h3> {c.name} </h3>
                    {LoadedAnnotatedDetails.map((details)=>(
                        <div>
                            {details.categoryid_three === c.id ?
                            <div className="ddx">
                                <div className="card text-center font-weight-bold border-warning bg-warning">
                                    <div className="card-header text-black">
                                        <div className="row text-left">
                                            Video ID : {details.id} <br/>
                                            Annotated Level : {details.level} <br/><br/>
                                            Video ID (Unique Child's): {details.childid} <br/>
                                            Annotated Level 1 Video ID:{details.childidLevel1}<br/>
                                            Annotated Category-Level-2 ID: {details.category} {c.name}<br/>
                                            Added Description : {details.description} <br/><br/><br/>

                                            {<ReactPlayer
                                                url={details.video}
                                                controls={true}
                                                type="video/mp4"
                                                width="600px"
                                                height="200px"
                                            />}

                                        </div><br/>
                                        <div className="align-content-left"><p data-tip={details.video}><h6 align="left">View Saved URL</h6></p>
                                            <ReactTooltip /></div>
                                    </div></div><br/></div>
                                : null

                            }

                        </div>
                    ))}</div>
                ))}



            </div>
        );
    }
}

export default ViewAnnotationsLevelThree;
