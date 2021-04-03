import React, {Component} from 'react';
import PropTypes from "prop-types";
import video1 from "../../../Video_Store/ChildVideo1.mp4";
import "./style_l2ann.css";
import axios from "axios";
import {categoriesLevel2API, videoUploadLevelTwo} from "../../../configs/config";
import ReactPlayer from "react-player";

class ViewAnnotationsLevelTwo extends Component {

    static get propTypes() {
        return {
            childId: PropTypes.number,
            levelOnevideoId: PropTypes.number,


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
        axios.get(videoUploadLevelTwo+"?id="+this.state.childId+'&&idlOne='+this.state.levelOnevideoId)
            .then(response => {
                    this.setState({LoadedAnnotatedDetails: response.data});
                    //alert('display:'+response.data)


                    //console.log("check"+this.state.LoadedAnnotatedDetails)

                    // alert('checking')

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
                <div className="dd">
                <h5>View Annotations Level-2</h5><br/>
                Unique Child Video ID: {childId}<br/>
                    Level One Annotated Video ID: {levelOnevideoId}<br/></div><br/>

                <div>
                    {LoadedAnnotatedDetails.map((details)=>(
                        <div>
                                <div>
                                    <div className="card text-center font-weight-bold btn-outline-secondary">
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
                                                <div><br/>
                                                    <button className="btn-outline-warning" onClick={() => this.loaLevel2Ann(details.id)}> Add Level-3-Annotations </button> <br/><br/>
                                                    <tr><button className="btn-outline-warning"> View Annotations for video ID Level-3: {details.id} </button>
                                                        <button className="btn-outline-warning"> Close Annotations </button></tr> <br/><br/>
                                                    {/*open ? <ViewAnnotationsLevelTwo childId={details.childid} levelOnevideoId={details.id}/>
                                                        : null*/}
                                                </div>
                                            </div></div></div><br/></div>
                        </div>
                    ))}</div>



            </div>
        );
    }
}

export default ViewAnnotationsLevelTwo;
