import React, {Component} from 'react';
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import video1 from '../../../Video_Store/ChildVideo1.mp4';
import ReactPlayer from 'react-player';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import '.././style.css';
import {confirmAlert} from "react-confirm-alert";
import axios from "axios";
import {Form} from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import {categoriesLevel3API, videono, videoUpload, videoUploadLevelThree} from "../../../configs/config";
import Foldermakinglevel2 from "../../Foldermaking/Foldermakinglevel2";
import Foldermakinglevel3 from "../../Foldermaking/Foldermakinglevel3";

const ffmpeg = createFFmpeg({log: true});

/*Video trimming using ffempg. Its a open source library, react provides a package as well.
* Do not remove video1 , which is retrieving from Video_Store
* It is an essential component.
*
*
* */

class VideoTrimmerLevel3 extends Component {

    static get propTypes() {
        return {
            childId: PropTypes.number,
            level: PropTypes.number,
            selectcategory: PropTypes.number,
            url:PropTypes.string,
            videoId:PropTypes.number,
            level1Id:PropTypes.number,
            catlevel1:PropTypes.number,
            catlevel2:PropTypes.number,
        }
    }


    constructor(props) {
        super(props);
        this.player = React.createRef();
        //this.myinput = React.createRef();
        console.log(this.props);

        this.state = {
            ready: false,
            video: video1,
            gif: '',
            currentTime: 0,
            markedStartTime:'00:00',
            markedEndTime:'00:00',
            description:'',
            childId: this.props.childId,
            videoId:this.props.videoId,
            selectedvideo:null,
            vurl:this.props.url,
            name:this.props.name,
            selectedcategory:this.props.selectcategory,
            time:'',
            c_name:'',
            savefolder:'',
            level1Id:this.props.level1Id,
            uploadfolder:'close',
            folderpath:'anypath',
            outputfilename:this.props.url,

        }
        //alert("prop types"+this.props.childId)
        this.onChange = this.onChange.bind(this);
        this.settimeStart = this.settimeStart.bind(this);
        this.settimeEnd = this.settimeEnd.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.loadvideo = this.loadvideo.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.uploadfolder = this.uploadfolder.bind(this);
        this.uploadfolderclose = this.uploadfolderclose.bind(this);

    }
    componentDidMount() {

        axios.get(categoriesLevel3API+this.state.selectedcategory)
            .then(response => {
                this.setState({
                        c_id: response.data.id,
                        c_name:response.data.name,
                    }
                )
                console.log("displaying data"+response.data)
            })
            .catch(function (error) {
                console.log(error)

            })

    }
    loadvideo(){

    }

    async loadx(){
        await ffmpeg.load();
        this.setState({ready: true});
    }

    async convertToTrimmed() {
        // Write the file to memory
        alert("Trimming Video........... \n This may take few seconds or minutes depending the size of the given trimming video.\n Once it is complete,the trimmed video will be loaded to below in the page.");
        await ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(this.state.vurl));

        // Run the FFMpeg command
        //-i input.mp4 -ss 00:00:05 -c copy -to 00:00:07 sliced-output.mp4
        await ffmpeg.run('-i', 'test.mp4', '-ss', this.state.markedStartTime, '-c', 'copy', '-to', this.state.markedEndTime, 'out.mp4');

        // Read the result
        const data = ffmpeg.FS('readFile', 'out.mp4');
        //console.log("here goes data..." + data);

        // Create a URL
        const url = URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
        //const filenew = await fetchFile(data);
        const file = new File([data], this.state.outputfilename)
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

        if(this.state.time!=='') {
            this.setState({markedStartTime: this.state.time});
            this.setState({time: ''});

        }
        else{
            const timeStart = this.format(this.player.current.getCurrentTime());
            this.setState({markedStartTime: timeStart});
        }

    }
    settimeEnd(){


        if(this.state.time!=='') {
            this.setState({markedEndTime: this.state.time});
            this.setState({time: ''});

        }
        else{
            const timeEnd = this.format(this.player.current.getCurrentTime());
            this.setState({markedEndTime: timeEnd});
        }

    }

    handleInputChange(event){
        this.setState({
            description: event.target.value
        })
    }

    handleInput(event){
        this.setState({
            time: event.target.value
        })
    }


    onSubmit(e){
        e.preventDefault()
        let res = this.uploadFile(this.state.selectedvideo);
        //console.log(res.data);
    }
    //async axios
    uploadFile(file){

        console.log("details",this.props.childId,this.props.videoId,this.state.description,this.props.level,this.props.selectcategory);

        const formData = new FormData();
        formData.append('childid',this.props.childId)
        formData.append('childidLevel1',this.props.level1Id)
        formData.append('childidLevel2',this.props.videoId)
        formData.append('description',this.state.description)
        formData.append('level',this.props.level)
        formData.append('category',this.props.catlevel2)
        formData.append('categoryid_one',this.props.catlevel1)
        formData.append('categoryid_three',this.props.selectcategory)
        formData.append('folderstructure',this.state.savefolder)
        formData.append('video',this.state.selectedvideo)
        formData.append('folderstructure',this.state.folderpath)

        return  axios.post(videoUploadLevelThree, formData,{
            headers: {
                // contentType: "multipart/form-data", // important

            }
        })
            .then(function (response) {
                alert('Successfully Saved the Data.\n Click *Load Annotated Videos* Button to view the Results.')
                axios.post(videono, {
                    videochildlevelthree_id: response.data.id
                })
                    .then(function () {
                        alert('Successfully Updated the Video no.')
                        window.close()

                    })
            })
            .catch((error) => {
                alert('Folder already created or Error in Saving')
            });
    }
    uploadfolder(){
        this.setState({
                uploadfolder: 'open'
            }
        )

    }
    uploadfolderclose(){
        this.setState({
                uploadfolder: 'close'
            }
        )

    }

    callbackFunction = (childData) => {
        this.setState({folderpath: childData})
    }

    render() {
        const {vurl} = this.state;
        const {childId} = this.state;
        const {videoId} = this.state;
        const {level1Id}=this.state;
        const {video} = this.state;
        const {gif} = this.state;
        const {markedStartTime} = this.state;
        const {markedEndTime} = this.state
        const {selectedcategory} = this.state;
        const {c_name} = this.state;
        const {uploadfolder}=this.state;
        return  (
            <div className="App">
                Video ID (Unique Child Video) : {childId} <br/>
                Video ID (Annotated Video 1 ID) : {videoId}<br/>
                Video ID (Annotated Video 2 ID) : {level1Id}<br/>
                Selected Category ID and Name : {selectedcategory}-----{c_name}<br/>
                Video url: {vurl}<br/>
                <br/><br/><br/>
                <br/><br/>
                {
                    video &&
                    <Container>
                        <div className="PlayerWrapper">
                            <br/>
                            <ReactPlayer
                                url={vurl}
                                controls={true}
                                ref={this.player}

                            />
                            <div className="ControlWrapper">
                                <Grid container direction="row" alignItems="center" justify="space-between" style={{padding:16}}>
                                    <Grid item>
                                        Manual Enter Time:
                                        <input type="text"
                                               id="time"
                                               name="time"
                                               placeholder="00:00"

                                               value={this.state.time}
                                               onChange={this.handleInput}

                                        /><br/>
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
                    <div align="center" className="bg-warning">
                        Folder path: {this.state.folderpath} <br/><br/><br/>
                        <button  onClick={this.uploadfolder} className="btn-dark">Open Upload Folder</button><br/><br/>
                        <button  onClick={this.uploadfolderclose} className="btn-dark">Close Upload Folder</button><br/><br/>
                        {uploadfolder==='open' ?
                            <div>
                                <Foldermakinglevel3 mainvideoIdfolder={this.props.childId} video1folderId={this.props.level1Id} video2folderId={this.props.videoId} category2folder={this.props.catlevel2} category3folder={selectedcategory+'_'+c_name} category1folder={this.props.catlevel1} parentCallback = {this.callbackFunction} /><br/>

                            </div>
                            : null}

                    </div>
                </div>

            </div>
        )
    }
}
export default VideoTrimmerLevel3;
