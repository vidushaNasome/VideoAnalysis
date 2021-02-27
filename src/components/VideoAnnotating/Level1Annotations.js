import React, {Component} from 'react';
import axios from "axios";
import qs from "query-string";
import VideoPlayer from "react-video-js-player";
import {Button, Form} from "react-bootstrap";

class Level1Annotations extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).k,
            mainCategories: {},
            idv:''
        }
    }

    componentDidMount() {
        this.id=this.state.id;
        let sentence = this.id;
        sentence.split("_");
        const [idv, idcat] = sentence.split('_');
        const editedText = idv.slice(0, -5)
        this.setState({idv: editedText});
        axios.get("http://127.0.0.1:8000/VideoAnalysis/Categories/"+idcat+'/')
            .then(response => {
                this.setState({mainCategories: response.data});
            } )
            .catch(function (error) {
                console.log(error);

            })

    }

    render() {
        let {idv} = this.state;
        let {mainCategories} = this.state;
        return (
            <div>
                <div><br/><br/><br/><br/>
                    <div id="main">
                        <div>
                            <br/>
                            <h5 align="center" id="headingSub">Video ID : {idv} <br/> Level-1-Category : {mainCategories.name} </h5>
                        </div>
                        <div>
                            <VideoPlayer
                                controls={true}
                                width="1000px"
                                height="500px"
                            />
                        </div>
                        <br/>
                        <div><h6>Annotation Bar</h6></div>
                        <div align="left">


                            <br/><br/>
                        </div>
                        <br/><br/><br/>

                    </div>
                </div>



            </div>
        );
    }
}

export default Level1Annotations;
