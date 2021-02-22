import React, {Component} from 'react';
import VideoPlayer from "react-video-js-player";
import { Link } from 'react-router-dom';
import './style.css';


class AnnotateVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            video: {
                src: "http://www.example.com/path/to/video.mp4",
                poster:'',

            },
            name:'',
            id:'',
        }

        this.state.name=this.props.name;
        this.state.id=this.props.id;
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
        let {name} = this.state;
        let {id} = this.state;
        return (
            <div>
                Video id:{id} Video Name:{name}
                    <div>
                        <div>
                        <VideoPlayer
                            controls={true}
                            src={this.state.video.src}
                            poster={this.state.video.poster}
                            width="400px"
                            height="250px"
                            onReady={this.onPlayerReady.bind(this)}
                            onPlay={this.onVideoPlay.bind(this)}
                            onPause={this.onVideoPause.bind(this)}
                            onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
                            onSeeking={this.onVideoSeeking.bind(this)}
                            onSeeked={this.onVideoSeeked.bind(this)}
                            onEnd={this.onVideoEnd.bind(this)}
                        />
                        <div><br/>
                            Chlid Specification
                            <h4 className="videonavmainbtn" style={{  textDecoration: 'none' }}> <Link to={"/annotateVideo/id?_k=" +id }> Annotate </Link></h4>
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
