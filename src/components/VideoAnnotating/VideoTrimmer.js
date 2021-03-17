import React, {Component} from 'react';
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import video1 from '../../Video_Store/ChildVideo1.mp4';
import ReactPlayer from 'react-player';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import './style.css';
import {confirmAlert} from "react-confirm-alert";
import axios from "axios";
import {Form} from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';

const ffmpeg = createFFmpeg({log: true});


class VideoTrimmer extends Component {

    static get propTypes() {
        return {
            childId: PropTypes.number,
            level: PropTypes.number,
            selectcategory: PropTypes.number,
            url:PropTypes.string,
            name:PropTypes.string,

        }
    }

    constructor(props) {
        super(props);
        this.player = React.createRef();
        //this.myinput = React.createRef();

        this.state = {
            ready: false,
            video: video1,
            gif: '',
            currentTime: 0,
            markedStartTime:'00:00:00',
            markedEndTime:'00:00:00',
            description:'',
            childId: this.props.childId,
            selectedvideo:null,
            url:this.props.url,
            name:this.props.name,

        }
        alert(this.props.url)
        this.onChange = this.onChange.bind(this);
        this.settimeStart = this.settimeStart.bind(this);
        this.settimeEnd = this.settimeEnd.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.uploadFile = this.uploadFile.bind(this)

    }

    async loadx(){
        await ffmpeg.load();
        this.setState({ready: true});
    }

    async convertToTrimmed() {
        // Write the file to memory
        alert("Trimming Video..........");
        await ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(this.state.url));

        // Run the FFMpeg command
        //-i input.mp4 -ss 00:00:05 -c copy -to 00:00:07 sliced-output.mp4
       await ffmpeg.run('-i', 'test.mp4', '-ss', this.state.markedStartTime, '-c', 'copy', '-to', this.state.markedEndTime, 'out.mp4');

        // Read the result
        const data = ffmpeg.FS('readFile', 'out.mp4');
        //console.log("here goes data..." + data);

        // Create a URL
        const url = URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
        //const filenew = await fetchFile(data);
        const file = new File([data], "out.mp4")
       // const file = new File([new Blob(data)], {type:"video/mp4"});

        console.log("ttttttttt"+ file);

        this.setState({gif: url});
        this.setState({selectedvideo: file});




    }

    onChange(e){
        if(!ffmpeg.isLoaded()){
        this.loadx().then(r =>
            this.convertToTrimmed()
        );
        }else{
            confirmAlert({
                title: 'Trimmed Video Status',
                message: 'You have already trim a video. If need to trim again please re-load the page.',
                buttons: [
                    {
                        label: 'OK',
                    }
                ]
            });
        }
    }
    format(seconds){
        if (isNaN(seconds)) {
            return `00:00`;
        }
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, "0");
        if (hh) {
            return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
        }
        return `${mm}:${ss}`;
    };

    settimeStart(){
        const timeStart = this.format(this.player.current.getCurrentTime());
        this.setState({markedStartTime: timeStart});

    }
    settimeEnd(){
        const timeEnd = this.format(this.player.current.getCurrentTime());
        this.setState({markedEndTime: timeEnd});

    }

    handleInputChange(event){
        this.setState({
            description: event.target.value
        })
    }

    onSubmit(e){
       e.preventDefault()
        let res = this.uploadFile(this.state.selectedvideo);
        //console.log(res.data);
    }
    //async axios
   uploadFile(file){
        const formData = new FormData();
        formData.append('childid',this.props.childId)
        formData.append('description',this.state.description)
        formData.append('level','1')
        formData.append('category','16')
        formData.append('video',this.state.selectedvideo)

        return  axios.post('http://127.0.0.1:8000/VideoAnalysis/Videoupload/', formData,{
            headers: {
               // contentType: "multipart/form-data", // important

            }
        })
            .then(function (response) {
            //console.log(response);
            //window.location.reload();
            alert('Successfully Saved the Data')
                window.close()
        })
            .catch((error) => {
                alert('Error in Saving')
            });
    }

    render() {
        const {url} = this.state;
        const {name} = this.state;
        const {video} = this.state;
        const {gif} = this.state;
        const {markedStartTime} = this.state;
        const {markedEndTime} = this.state;
        return  (
                <div className="App">
                    <br/><br/><br/>
                    <br/><br/>
                    {
                        video &&
                        <Container>
                            <div className="PlayerWrapper">
                        <ReactPlayer
                            url={url}
                            controls={true}
                            ref={this.player}

                        />
                                <div className="ControlWrapper">
                                    <Grid container direction="row" alignItems="center" justify="space-between" style={{padding:16}}>
                                        <Grid item>
                                            <button onClick={this.settimeStart} id="trimpoints">Mark Trim Start Point
                                            </button>
                                            <button onClick={this.settimeEnd} id="trimpoints">Mark Trim End Point
                                            </button>

                                            <div className="Trim Timming">
                                                Selected Times for Trimming Videos<br/>
                                                Selected Trim Start:{markedStartTime} <br/>
                                                Selected Trim End:  {markedEndTime} <br/>
                                                <button onClick={this.onChange} id="trimVideo">Trim Video</button>

                                            </div>
                                        </Grid>

                                    </Grid>
                                </div>
                            </div>

                        </Container>

                    }
                    <br/>

                    <div className="trimmedResults">
                        <Typography variant="h6"> Trimmed Video Results </Typography>
                        <br/><br/>
                    {gif &&
                    <ReactPlayer controls={true} url={gif} />}
                    { gif &&
                    <Form className="trimmedResults2" onSubmit={this.onSubmit} >
                        <Form.Group>
                            <br/><br/>
                            <Form.Label>Add Description to Annotate Trimmed Video</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Add Descaription"
                                          onChange={this.handleInputChange}
                                          value={this.state.description}
                                          name="description"

                            />
                        </Form.Group>
                        <button id="trimVideo">Save Trimmed Video</button>
                    </Form>

                    }
                    <br/><br/><br/>
                    </div>

                </div>
            )
    }
}
export default VideoTrimmer;
