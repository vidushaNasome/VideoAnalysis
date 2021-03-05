import React, {Component} from 'react';
import  { useEffect, useState } from "react";
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import video1 from '../../Video_Store/ChildVideo1.mp4';

const ffmpeg = createFFmpeg({log: true})

class VideoTrimmer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            video: video1,
            gif: '',
        }

        //this.convertToGif = this.convertToGif.bind();
        //this.load = this.load.bind();
        //this.onSubmit=this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    async loadx(){
        await ffmpeg.load();
        this.setState({ready: true});
    }

    async convertToTrimmed() {
        // Write the file to memory
        await ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(this.state.video));

        // Run the FFMpeg command
        //-i input.mp4 -ss 00:00:05 -c copy -to 00:00:07 sliced-output.mp4
        let x='00:00:05';
        let y='00:01:35'
        await ffmpeg.run('-i', 'test.mp4', '-ss', x, '-c', 'copy', '-to', y, 'out.mp4');

        // Read the result
        const data = ffmpeg.FS('readFile', 'out.mp4');
        //console.log("here goes data..." + data);

        // Create a URL
        const url = URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
        this.setState({gif: url});

    }
    onChange(e){
        if(!ffmpeg.isLoaded()){
        this.loadx().then(r =>
            this.convertToTrimmed()
        );}
    }


    render() {
        const {ready} = this.state;
        const {video} = this.state;
        const {gif} = this.state;
        return  (
                <div className="App">
                    hello world
                    <br/><br/><br/>
                    {
                        video && <video
                            controls
                            width="250"
                            src={video1}
                        >

                        </video>
                    }

                    {/*<input type="file" onChange={(e)=>setVideo(e.target.files?.item(0))}/>*/}
                    <br/>

                    Result<br/>
                    <button onClick={this.onChange}>Trim the Video</button>
                    {gif && <video controls src={gif} width='250'/>}

                    <br/><br/><br/>

                </div>
            )
    }
}
export default VideoTrimmer;
