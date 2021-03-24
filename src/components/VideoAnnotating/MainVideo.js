import React, {Component} from 'react';
import axios from "axios";
import qs from "query-string";
import './style.css';
import {Button, Form} from "react-bootstrap";
import ReactPlayer from "react-player";

class MainVideo extends Component {

    constructor(props) {
        super(props);

        this.state={
            id:qs.parse(this.props.location.search, { ignoreQueryPrefix: true })._k,
            url:'',
            name:'',
            mainCategories: [],
            level1cat:'',
            LoadedFrames:[],
            LoadedAnnotatedDetails:[],
            loadedvideo:{}
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
        //Retrieve video data - uploaded videos
        axios.get('http://127.0.0.1:8000/VideoAnalysis/uploadretrieve/' + this.state.id + '/')
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

        //categories
        axios.get("http://127.0.0.1:8000/VideoAnalysis/Categories/")
            .then(response => {
                this.setState({mainCategories: response.data});
            } )
            .catch(function (error) {
                console.log(error);

            })

        //loaded details
        axios.get("http://127.0.0.1:8000/VideoAnalysis/Videoupload?id="+ this.state.id)
            .then(response => {
                this.setState({LoadedAnnotatedDetails: response.data});
                //console.log("check"+this.state.LoadedAnnotatedDetails)
               // alert('checking')

            })
            .catch(function (error) {
                console.log(error);


            })
    }
    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
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
        let {url} = this.state;
        let {name} = this.state;
        let {LoadedAnnotatedDetails} = this.state;
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
                    <div id="right"><br/><br/>
                    <h3>Child Specification</h3>
                        <button className="btn-dark"> Mark Annotation Complete </button>
                    </div>
                    <div><br/><br/>
                    <h3>Child's Video</h3><h4> Video ID : {id} <br/> Video url: {url} <br/> Name: {name} </h4>
                        <video
                            controls={true}
                            width="800px"
                            height="450px"
                            src={url}
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
                        <div align="center">
                            <div className="catelevel1dis">
                                Level 1 Annotations
                                {LoadedAnnotatedDetails.map((details) => (
                                    <div className="col-md-6">
                                        <div className="card text-center font-weight-bold alert-primary">
                                            <div className="card-header text-black">
                                                <div className="row">
                                                    Child Video ID: {details.childid} <br/>
                                                    Annotated Level : {details.level} <br/>
                                                    Annotated Category ID: {details.category_id} <br/>
                                                    Added Description : {details.description} <br/><br/>
                                                    {details.video}
                                                    <ReactPlayer
                                                        url={details.video}
                                                        controls={true}
                                                        type="video/mp4"
                                                        width="600px"
                                                        height="200px"
                                                    />

                                                   </div> <br/>
                                            </div>
                                            <button className="btn-primary"> Add Level 2 Annotations </button> <br/>
                                            <button className="btn-danger"> Delete </button>
                                        </div><br/><br/>
                                    </div>
                                ))}
                                <br/>
                            </div>
                    </div>
                    <br/><br/><br/>

                </div>
                </div></div>
        );


    }
}

export default MainVideo;
