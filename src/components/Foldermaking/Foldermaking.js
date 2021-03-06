import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import PropTypes from "prop-types";
import './stylefolder.css';

class Foldermaking extends Component {
    static get propTypes() {
        return {
            check: PropTypes.string,
            mainvideoIdfolder:PropTypes.string,
            category1folder:PropTypes.string,


        }
    }

    constructor(props) {
        super(props);
        this.state={
            mainfolder:'annotatedvideos/',
            typical_type:'typical/',
            mainvideoIdfolder:this.props.mainvideoIdfolder+'/',
            videosensor:'videosensor/',
            cameraname:'camera_type_1/',
            category1folder:this.props.category1folder+'/',
            uploadfolder:'',
            camera:[{id:1,name:'camera1'},{id:2,name:'camera2'},{id:3,name:'camera3'}]
        }


        this.handleInputuploadfolder = this.handleInputuploadfolder.bind(this);
        this.typical = this.typical.bind(this);
        this.antypical = this.antypical.bind(this);
        this.sendBackData  = this.sendBackData.bind(this);
        this.mergedata  = this.mergedata.bind(this);


    }
    handleInputuploadfolder(event){
        this.setState({
            uploadfolder: event.target.value
        })
    }
    mergedata(){
        let cam = this.cc.value;
        //alert(cam)
        this.setState({
            cameraname:  "camera_type_"+cam+"/"
        })
        this.merge = this.state.mainfolder+this.state.typical_type+this.state.mainvideoIdfolder+
            this.state.videosensor+this.state.cameraname+'level1/'+this.state.category1folder

        this.setState({
            uploadfolder:  this.merge
        })

    }

    sendBackData = () => {
        this.props.parentCallback(this.state.uploadfolder);
    }
    typical(){
        this.setState({
            typical_type: 'typical/'
        })

    }
    antypical(){
        this.setState({
            typical_type: 'antypical/'
        })

    }
    render() {
        const {camera} = this.state;
        let cameralist = camera.length > 0
            && camera.map((item, i) => {
                return (
                    <option key={i} value={item.id}>{item.name}</option>
                )
            }, this);
        return (
            <div className="main">
                <div className="folder">
                <h6> Annotated Video Saving Folder Structure <br/></h6>
                    MainPath:{this.state.mainfolder}<br/>
                    typical type:{this.state.typical_type}<br/>
                    Unique Child Video Folder:{this.state.mainvideoIdfolder}<br/>
                    Video Sensors:{this.state.videosensor}<br/>
                    Camera Type:{this.state.cameraname}<br/>
                    Category 1 Folder:{this.state.category1folder}<br/>
                </div><br/>
                        <input type="text"
                                      onChange={this.handleInputuploadfolder}
                                      value={this.state.uploadfolder}
                                      name="uploadfolder"
                               id="dd"

                        /><br/><br/>
                        <button id="typical" onClick={this.typical}>+ Typical</button>
                    <button id="antypical" onClick={this.antypical}> + Antypical</button>
                <select id="selectmain2" variant="primary" ref = {(input)=> this.cc = input}>
                    >
                    {cameralist}
                </select>

                    <div className="flex-row"><button id="antypical" onClick={this.mergedata}> View/Make Changes Folder Structure</button>
                    <button onClick={this.sendBackData}>Save Changes</button></div><br/>

            </div>
        );
    }
}

export default Foldermaking;
