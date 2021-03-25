import React, {Component} from 'react';
import ReactPlayer from "react-player";
import qs from "query-string";
import axios from "axios";
import PropTypes from "prop-types";

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
            xvariable:'',
            id:this.props.id,

        }


    }

    componentDidMount() {
        //loaded details for annotated videos
        axios.get("http://127.0.0.1:8000/VideoAnalysis/Videoupload?id="+ this.state.id)
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
    }
    retrieveCategory (id){

        //let xvariable='';
        axios.get("http://127.0.0.1:8000/VideoAnalysis/Categories/"+id)
            .then(response => {
                    this.setState({xvariable: response.data.name});

                }
            )
            .catch(function (error) {
                console.log(error);
            })

        return this.state.xvariable;


    }

    render() {
        let {LoadedAnnotatedDetails} = this.state;
        return (
            <div>

                <div className="catelevel1dis">
                    Level 1 Annotations
                    {LoadedAnnotatedDetails.map((details) => (
                        <div className="col-md-6">
                            <div className="card text-center font-weight-bold alert-primary">
                                <div className="card-header text-black">
                                    <div className="row">
                                        Child Video ID: {details.childid} <br/>
                                        Annotated Level : {details.level} <br/>
                                        Annotated Category ID: {details.category} <br/>
                                        Annotated Category Name: {this.retrieveCategory(details.category)} <br/>
                                        Added Description : {details.description} <br/><br/>
                                        {details.video}
                                        {<ReactPlayer
                                            url={details.video}
                                            controls={true}
                                            type="video/mp4"
                                            width="600px"
                                            height="200px"
                                        />}

                                    </div> <br/>
                                </div>
                                <button className="btn-primary"> Add Level 2 Annotations </button> <br/>
                                <button className="btn-danger"> Delete </button>
                            </div><br/><br/>
                        </div>
                    ))}
                    <br/>
                </div>
                
            </div>
        );
    }
}

export default ViewAnnotations;
