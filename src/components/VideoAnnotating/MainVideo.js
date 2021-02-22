import React, {Component} from 'react';
import axios from "axios";
import qs from "query-string";
import './style.css';
import VideoPlayer from "react-video-js-player";
import {Button, Form} from "react-bootstrap";

class MainVideo extends Component {

    constructor(props) {
        super(props);

        this.state={
            id:qs.parse(this.props.location.search, { ignoreQueryPrefix: true })._k,
            mainCategories: []
        }
    }



    componentDidMount() {
        //alert(qs.parse(this.props.location.search, { ignoreQueryPrefix: true })._k);
       /* axios.get('https://backend-280306.uc.r.appspot.com/api/categories/' +qs.parse(this.props.location.search, { ignoreQueryPrefix: true })._k)
            .then(response => {

                this.setState({
                    id: response.data.id,
                    cName: response.data.cName,
                    cType: response.data.cType,
                    cDate: response.data.cDate

                })


            })
            .catch(function (error) {
                console.log(error)

            })*/

        axios.get("http://127.0.0.1:8000/VideoAnalysis/Categories/")
            .then(response => {
                this.setState({mainCategories: response.data});
            } )
            .catch(function (error) {
                console.log(error);

            })
    }

    onPlayerReady(player){
        console.log("Player is ready: ", player);
        this.player = player;
    }

    onVideoPlay(duration){
        console.log("Video played at: ", duration);
    }

    onVideoPause(duration){
        console.log("Video paused at: ", duration);
    }

    onVideoTimeUpdate(duration){
        console.log("Time updated: ", duration);
    }

    onVideoSeeking(duration){
        console.log("Video seeking: ", duration);
    }

    onVideoSeeked(from, to){
        console.log(`Video seeked from ${from} to ${to}`);
    }

    onVideoEnd(){
        console.log("Video ended");
    }


    render() {
        let {id} = this.state;
        const { mainCategories } = this.state;
        let mainCategoriesList = mainCategories.length > 0
            && mainCategories.map((item, i) => {
                return (
                    <option key={i} value={item.id}>{item.name}</option>
                )
            }, this);
        return (
            <div><br/>
                <br/><h1> Video Annotating </h1>
                <div id="main">
                    <div id="right"><br/><br/> <h3>Child Specification</h3></div>
                    <div><br/><br/>
                    <h3>Child's Video</h3><h4> video id : {id} </h4>
                        <VideoPlayer
                            controls={true}
                            width="800px"
                            height="450px"
                            onReady={this.onPlayerReady.bind(this)}
                            onPlay={this.onVideoPlay.bind(this)}
                            onPause={this.onVideoPause.bind(this)}
                            onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
                            onSeeking={this.onVideoSeeking.bind(this)}
                            onSeeked={this.onVideoSeeked.bind(this)}
                            onEnd={this.onVideoEnd.bind(this)}
                        />

                </div>
                <br/><br/>
                    <div> <br/><br/><h3>Select Level 1 Category</h3></div>
                    <div align="left">
                        <Form className="row">
                            <Form.Group>
                                <Form.Label>Select Level 1 Category </Form.Label>
                                <select id="selectmain" variant="primary">
                                    {mainCategoriesList}
                                </select>
                            </Form.Group>
                            <Button id="bt" variant="primary" type="submit">
                                Create Annotation Bar
                            </Button>
                        </Form>
                        <br/><br/>
                    </div>
                    <br/><br/><br/>

                </div>
            </div>
        );


    }
}

export default MainVideo;
