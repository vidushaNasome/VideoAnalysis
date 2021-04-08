import React, {Component} from 'react';
import ReactPlayer from "react-player";
import qs from "query-string";
import axios from "axios";
import PropTypes from "prop-types";
import {categoriesLevel2API,videoRetrievefromUpload,categoriesAPI,videoUpload} from "../../configs/config";
import ViewAnnotationsLevelTwo from "./level2Annotations/ViewAnnotationsLevelTwo";

class ViewAnnotations extends Component {

    static get propTypes() {
        return {
            id: PropTypes.number,
        }
    }


    constructor(props) {
        super(props);

        this.state={

            LoadedFrames:[],
            LoadedAnnotatedDetails:[],
            categories:[],
            id:this.props.id,
            Cat2:[],
            open:-90,

        }
        this.open_Annotated_Video=this.open_Annotated_Video.bind(this);
        this.open_Annotated_Video_close=this.open_Annotated_Video_close.bind(this);

    }

    componentDidMount() {
        //loaded details for annotated videos
        axios.get(videoUpload+"?id="+ this.state.id)
            .then(response => {
                    this.setState({LoadedAnnotatedDetails: response.data});
                    // alert('display'+response.data)


                    //console.log("check"+this.state.LoadedAnnotatedDetails)

                    // alert('checking')

                }
            )
            .catch(function (error) {
                console.log(error);


            })

        axios.get(categoriesAPI)
            .then(response => {
                    this.setState({categories: response.data});

                }
            )
            .catch(function (error) {
                console.log(error);
            })
        //Retrieve level 1 categories
        axios.get(categoriesLevel2API)
            .then(response => {
                this.setState({Cat2: response.data});
            } )
            .catch(function (error) {
                console.log(error);

            })

    }

    loaLevel2Ann(id){
        //alert('kk');
        window.open('/level2/?k='+id,'','height=800,width=800');
    }
    open_Annotated_Video(id){
        this.setState({open:id})
    }
    open_Annotated_Video_close(){
        this.setState({open:-90})
    }

    render() {
        let {LoadedAnnotatedDetails} = this.state;
        let {categories}=this.state;
        let {open} = this.state;
        /*const {Cat2}=this.state;

        let Cat2List = Cat2.length > 0
            && Cat2.map((item, i) => {
                return (
                    <option key={i} value={item.id}>{item.name}</option>
                )
            }, this);*/
        
        return (
            <div>
                <div className="catelevel1dis">
                    <h3>Level 1 Annotations</h3>
                    {categories.map((c) => (
                        <div className="col-md-6 border-dark">
                            <h3> {c.name} </h3>
                                       <div>
                                           {LoadedAnnotatedDetails.map((details)=>(
                                            <div>
                                                {details.category === c.id ?
                                                    <div>
                                                        <div className="card text-center font-weight-bold alert-primary">
                                                            <div className="card-header text-black">
                                                                <div className="row">
                                                                    Video ID : {details.id} <br/>
                                                                Video ID (Unique Child's): {details.childid} <br/>
                                                                Annotated Level : {details.level} <br/>
                                                                Annotated Category ID and NAME: {details.category} - {c.name} <br/>
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
                                                                    <button className="btn-outline-dark" onClick={() => this.loaLevel2Ann(details.id)}> Add Level 2 Annotations </button> <br/><br/>
                                                                    <tr><button className="btn-outline-primary" onClick={() => this.open_Annotated_Video(details.id)}> View Annotations Level-2 for video ID: {details.id} </button>
                                                                        <button className="btn-outline-primary" onClick={this.open_Annotated_Video_close}> Close Annotations </button></tr> <br/><br/>
                                                                    {open === details.id? <ViewAnnotationsLevelTwo childId={details.childid} levelOnevideoId={details.id}/>
                                                                            : null}
                                                                    </div>
                                                    </div></div></div><br/></div>

                                                    : null

                                                }
                                            </div>
                                        ))}</div>



                                    </div>

                    ))}

                </div>
                
            </div>
        );
    }
}

export default ViewAnnotations;
