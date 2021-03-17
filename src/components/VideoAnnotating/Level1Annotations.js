import React, {Component} from 'react';
import axios from "axios";
import qs from "query-string";
import {confirmAlert} from "react-confirm-alert";
import VideoTrimmer from "./VideoTrimmer";
import Typography from "@material-ui/core/Typography";




class Level1Annotations extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).k,
            mainCategories: {},
            idv:'',
            url:'',
            name:'',
        }

    }

    componentDidMount() {
        //window.addEventListener('beforeunload', this.keepOnPage);
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
        sessionStorage.setItem(sentence,sentence);

        //Retrieve video data - uploaded videos
        axios.get('http://127.0.0.1:8000/VideoAnalysis/uploadretrieve/' + this.state.idv + '/')
            .then(response => {
                this.setState({
                        url: response.data.video,
                        name:response.data.name,
                    }
                )

            })
            .catch(function (error) {
                console.log(error)

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
                        onClick: () =>this.props.history.push('/level1/id?k='+sessionStorage.getItem(this.state.id))

                    }
                ]
            });
    }

    render() {
        let {idv} = this.state;
        let {mainCategories} = this.state;
        let {url} = this.state;
        let {name} = this.state;
        return (
            <div>
                <div><br/><br/><br/><br/>
                    <div id="main">
                        <Typography variant="h6"> Video ID : {idv} <br/> Level-1-Category : {mainCategories.name} </Typography>
                        <div align="center">
                            <VideoTrimmer childId = {idv} name={name} level={'1'} selectcategory={mainCategories.id} url={"http://127.0.0.1:8000/media/retreivingData/childid1.mp4"}/>

                        </div>

                        <br/>


                    </div>
                </div>



            </div>
        );
    }
}

export default Level1Annotations;
