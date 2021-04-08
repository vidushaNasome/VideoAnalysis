import React, {Component} from 'react';
import PropTypes from "prop-types";
import video1 from "../../../Video_Store/ChildVideo1.mp4";
import "./style_l2ann.css";
import axios from "axios";
import {categoriesLevel2API, videoUploadLevelTwo} from "../../../configs/config";
import ReactPlayer from "react-player";
import ViewAnnotationsLevelThree from "../level3Annotations/ViewAnnotationsLevelThree";

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
            cat2:[],
            open:-90,
        }

        this.open_Annotated_Video=this.open_Annotated_Video.bind(this);
        this.open_Annotated_Video_close=this.open_Annotated_Video_close.bind(this);
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
    loaLevel3Ann(id){
        //alert('kk');
        window.open('/level3/?k='+id,'','height=800,width=800');
    }
    open_Annotated_Video(id){
        this.setState({open:id})
    }
    open_Annotated_Video_close(){
        this.setState({open:-90})
    }

    render() {
        let {childId} = this.state;
        let {levelOnevideoId} = this.state;
        let {LoadedAnnotatedDetails} = this.state;
        let {open} = this.state;
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
                                    <div className="card text-center font-weight-bold border-primary">
                                        <div className="card-header text-black">
                                            <div className="row">

                                                Video ID (Unique Child's): {details.childid} <br/>
                                                Annotated Level 1 Video ID:{details.childidLevel1}<br/>
                                                Annotated Category-Level-1 ID: {details.categoryid_one}<br/><br/>

                                                Video ID (Level 2) : {details.id} <br/>
                                                Annotated Level : {details.level} <br/>
                                                Annotated Category-Level-2 ID: {details.category}<br/>
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
                                                    <button className="btn-outline-warning" onClick={() => this.loaLevel3Ann(details.id)}> Add Level-3-Annotations </button> <br/><br/>
                                                    <tr><button className="btn-outline-warning" onClick={() => this.open_Annotated_Video(details.id)}> View Annotations for Level-3 video ID Level-3: {details.id} </button>
                                                        <button className="btn-outline-warning" onClick={this.open_Annotated_Video_close}> Close Annotations </button></tr> <br/><br/>
                                                    {open === details.id? <ViewAnnotationsLevelThree childId={details.childid} levelOnevideoId={details.childidLevel1} levelTwovideoId={details.id}/>
                                                        : null}
                                                </div>
                                            </div></div></div><br/></div>
                        </div>
                    ))}</div>



            </div>
        );
    }
}

export default ViewAnnotationsLevelTwo;
