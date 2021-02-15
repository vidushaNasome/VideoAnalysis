import React,{Component} from 'react';
import {Modal,Button,Row, Col,Form} from 'react-bootstrap';
import VideoPlayer from "react-video-js-player";
import {Link} from "react-router-dom";

export class AddVideoModel extends Component{
    constructor(props) {
        super(props);

        this.state = {
            video: {
                src: "http://www.example.com/path/to/video.mp4",

            }
        }
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
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Managing Categories Demo Video
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4></h4>
                   <div className="container">
                       <div className="content pt-4 pt-lg-0">
                           <VideoPlayer
                               controls={true}
                               src={this.state.video.src}
                               poster={this.state.video.poster}
                               width="500px"
                               height="300px"
                               onReady={this.onPlayerReady.bind(this)}
                               onPlay={this.onVideoPlay.bind(this)}
                               onPause={this.onVideoPause.bind(this)}
                               onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
                               onSeeking={this.onVideoSeeking.bind(this)}
                               onSeeked={this.onVideoSeeked.bind(this)}
                               onEnd={this.onVideoEnd.bind(this)}
                           />
                       </div>

                   </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button><Link to="/categories" id="nn" style={{  textDecoration: 'none',color:'white' }}>Go to Category</Link></Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
