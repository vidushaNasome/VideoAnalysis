import React, {Component} from 'react';
import axios from "axios";
import qs from "query-string";
import './style.css';
import VideoPlayer from "react-video-js-player";
import {Button, Form} from "react-bootstrap";
import userimg from "../../Images/user.png";

class MainVideo extends Component {

    constructor(props) {
        super(props);

        this.state={
            id:qs.parse(this.props.location.search, { ignoreQueryPrefix: true })._k,
            mainCategories: [],
            level1cat:'',
            LoadedFrames:[],
        }
        if (this.state.id===""){
            this.state.id=localStorage.getItem("videoid")
        }
        this.onAnnotationBar=this.onAnnotationBar.bind(this);
    }



    componentDidMount() {

        axios.get("http://127.0.0.1:8000/VideoAnalysis/createfolder?uniquename="+this.state.id)
            .then(response => {
                alert("Successfully created the Unique Child Folder. You can start AnnotatingDisplay.")
                localStorage.setItem("videoid",this.state.id)

            })
            .catch(function (error) {
                console.log(error);


            })
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
    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
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

    onAnnotationBar(e){
        e.preventDefault();
        let idForSelected = this.menu.value.valueOf();
        this.id=this.state.id;

        //this.setState({LoadedFrames:  });
        this.setState({
            LoadedFrames: this.state.LoadedFrames.concat(idForSelected)
        })
        window.open('/level1/id?k='+this.id+'idcat_'+idForSelected,'','height=800,width=800');

    }


    render() {
        let {id} = this.state;
        let {LoadedFrames} = this.state;
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
                        <Form className="row" onSubmit={this.onAnnotationBar}>
                            <Form.Group>
                                <Form.Label>Select Level 1 Category </Form.Label>
                                <select id="level1cat" variant="primary" name="level1cat" ref = {(input)=> this.menu = input}>
                                    {mainCategoriesList}
                                </select>
                            </Form.Group>
                            <Button id="bt" variant="primary" type="submit">
                                Start Annotating
                            </Button>
                        </Form>
                        <br/><br/>
                    </div>


                    <div className="">
                        <h1 align="center"> Annotations Specification </h1>
                        Unique Folder ID: Childvideo/{id}
                        {/*LoadedFrames.map((l1cat) => (
                            <div className="col-md-4">
                                <div className="card text-center font-weight-bold">
                                    <div className="card-header text-black">
                                        {l1cat}
                                    </div></div>
                            </div>
                        ))*/}
                    </div>
                    <br/><br/><br/>

                </div>
            </div>
        );


    }
}

export default MainVideo;
