import React, {Component} from 'react';
import axios from "axios";
import qs from "query-string";
import {confirmAlert} from "react-confirm-alert";
import VideoTrimmerLevel3 from "./VideoTrimmerLevel3";
import Typography from "@material-ui/core/Typography";
import {Button} from "react-bootstrap";
import {videoUploadLevelTwo, videoUpload, categoriesLevel2API, categoriesLevel3API} from "../../../configs/config";

class Level3Annotations extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).k,
            mainCategories: {},
            idv:'',
            url:'',
            name:'',
            trimstate:'Stop',
            videodet:{}
        }

        this.trimmer = this.trimmer.bind(this);
        this.trimmerEnd = this.trimmerEnd.bind(this)

    }

    componentDidMount() {

        axios.get(videoUploadLevelTwo + this.state.id )
            .then(response => {
                this.setState({
                        videodet:response.data
                    }
                )
                //alert(this.state.url+"hello aa level 1 ann.")
                this.loadCategories();

            })
            .catch(function (error) {
                console.log(error)

            })
        sessionStorage.setItem('id',this.state.id);

    }
    loadCategories(){
        //alert(this.state.videodet.categoryid_one+'vvv'+this.state.videodet.category)
        axios.get(categoriesLevel3API +'?id1='+this.state.videodet.categoryid_one+'&&id2='+this.state.videodet.category)
            .then(response => {
                this.setState({mainCategories: response.data});
            } )
            .catch(function (error) {
                console.log(error);

            })

    }
    componentWillUnmount() {
        confirmAlert({
            title: 'Confirm Closing Window.',
            message: 'Navigation to other components are disabled in this Window.Are you Sure you want Close this Window?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => window.close()
                },
                {
                    label: 'No',
                    onClick: () =>this.props.history.push('/level1/?k='+sessionStorage.getItem('id'))

                }
            ]
        });
    }
    trimmer(){
        this.setState({
                trimstate: 'start'
            }
        )

    }
    trimmerEnd(){
        this.setState({
                trimstate: 'stop'
            }
        )

    }

    render() {
        let {idv} = this.state;
        let {mainCategories} = this.state;
        let {url} = this.state;
        let {name} = this.state;
        let {trimstate}=this.state;
        let {id}=this.state;
        let {videodet}=this.state;
        let mainCategoriesList = mainCategories.length > 0
            && mainCategories.map((item, i) => {
                return (
                    <option key={i} value={item.id}>{item.name}</option>
                )
            }, this);
        return (
            <div>
                <div><br/><br/><br/><br/>
                    <div id="main">
                        <h1> Level 3 Annotations</h1>
                        <Typography variant="h6"> Main Video ID (Unique Child Video ID) : {videodet.childid} <br/> </Typography>
                        <Typography variant="h6"> Level-1 Annotated Video ID  : {videodet.childidLevel1} <br/> </Typography>
                        <Typography variant="h6"> Level-1 Annotated Category ID  : {videodet.categoryid_one} <br/> </Typography>
                        <Typography variant="h6"> Level-2 Annotated Video ID  : {videodet.id} <br/> </Typography>
                        <Typography variant="h6"> Level-2 Annotated Category ID: {videodet.category} <br/> </Typography>
                        <Typography variant="h6"> Select Category for Level 3 Annotations <br/> </Typography>
                        <select id="selectmain" variant="primary" ref = {(input)=> this.l1categoryid = input}>
                            >
                            {mainCategoriesList}
                        </select>

                        <br/><br/>
                        <div align="center">
                            <button  onClick={this.trimmer} className="btn-dark">
                                Open Trimmer
                            </button>
                            <button  onClick={this.trimmerEnd} className="btn-dark">
                                Close Trimmer
                            </button>
                            <br/><br/>
                            {trimstate==='start' ?
                                <div>
                                    <VideoTrimmerLevel3 childId = {videodet.childid} videoId={videodet.id}
                                                        level={3} selectcategory={this.l1categoryid.value}
                                                        url={videodet.video} level1Id={videodet.childidLevel1}
                                                        catlevel1={videodet.categoryid_one} catlevel2={videodet.category}/>

                                </div>
                                : null}

                        </div>


                    </div>

                    <br/>


                </div>
            </div>




        );
    }
}

export default Level3Annotations;
