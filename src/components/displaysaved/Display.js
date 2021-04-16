import React, {Component} from 'react';
import axios from "axios";
import {videono,videoUpload,videoUploadLevelTwo,videoUploadLevelThree} from "../../configs/config";
import './dd.css';

class Display extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            cat: [],
            l1:{},
            l2:{},
            l3:{},
            view1:false,
            view2:false,
            view3:false,

        }
        this.Clickl1=this.Clickl1.bind(this);
        this.Clickl2=this.Clickl2.bind(this);
        this.Clickl3=this.Clickl3.bind(this);
        this.close=this.close.bind(this);
    }

    componentDidMount() {
        axios.get(videono)
            .then(response => {
                this.setState({cat: response.data});
                console.log(this.props)

            })
            .catch(function (error) {
                console.log(error);


            })
    }
    Clickl1(id){
        axios.get(videoUpload+id)
            .then(response => {
                this.setState({l1: response.data});
                this.setState({view1:true})

            })
            .catch(function (error) {
                console.log(error);


            })

    }
    Clickl2(id){
        axios.get(videoUploadLevelTwo+id)
            .then(response => {
                this.setState({l2: response.data});
                this.setState({view2:true})

            })
            .catch(function (error) {
                console.log(error);


            })

    }
    Clickl3(id){
        axios.get(videoUploadLevelThree+id)
            .then(response => {
                this.setState({l3: response.data});
                this.setState({view3:true})

            })
            .catch(function (error) {
                console.log(error);


            })

    }
    close(){
        this.setState({view1:false})
        this.setState({view2:false})
        this.setState({view3:false})
        this.setState({l1:''})
        this.setState({l2:''})
        this.setState({l3:''})
    }
    render() {
        const {cat} = this.state;
        const {view1} = this.state;
        const {view2} = this.state;
        const {view3} = this.state;
        return (
            <div>
                Summary of All Annotated Videos<br/><br/>
                <div align="center">

                    {view1 ?
                        <div className="bsd">
                            Selected Details<br/>
                            Video ID(Level 1): {this.state.l1.id} <br/>
                            Unique Child Id:{this.state.l1.childid} <br/>
                            Level: {this.state.l1.level} <br/>
                            Category:{this.state.l1.category} <br/>
                            Description:{this.state.l1.description} <br/>
                            Saved Folder Path:&nbsp; {this.state.l1.uploadfolder} <br/><br/>
                            <button onClick={this.close} className="btn-outline-primary">close</button><br/><br/>

                        </div>
                        : null}
                    {view2 ?
                        <div className="bsd">
                            Selected Details<br/>
                            Video ID(Level 2):{this.state.l2.id} <br/>
                            Unique Child Id:{this.state.l2.childid} <br/>
                            Video Id Level 1:{this.state.l2.childidLevel1} <br/>
                            Level:{this.state.l2.level} <br/>
                            Category l1:{this.state.l2.categoryid_one} <br/>
                            Category l2:{this.state.l2.category} <br/>
                            Description:{this.state.l2.description} <br/>
                            Saved Folder Path:&nbsp;{this.state.l2.uploadfolder} <br/><br/>
                            <button onClick={this.close} className="btn-outline-primary">close</button><br/><br/>

                        </div>
                        : null}
                    {view3 ?
                        <div className="bsd">
                            Selected Details:<br/>
                            Video ID(Level 3):{this.state.l3.id} <br/>
                            Unique Child Id:{this.state.l3.childid} <br/>
                            Video Id Level 1:{this.state.l3.childidLevel1} <br/>
                            Video Id Level 2:{this.state.l3.childidLevel2} <br/>
                            Level:{this.state.l3.level} <br/>
                            Category l1:{this.state.l3.categoryid_one} <br/>
                            Category l2:{this.state.l3.category} <br/>
                            Category l3:{this.state.l3.categoryid_three} <br/>
                            Description:{this.state.l3.description} <br/>
                            Saved Folder Path:&nbsp;{this.state.l3.folderstructure} <br/><br/>

                            <button onClick={this.close} className="btn-primary">close</button><br/><br/>

                        </div>
                        : null}

                    <div className="catelevel1dis">
                        {cat.map((l1cat) => (
                            <div className="col-md-10">

                                Video No: {l1cat.id}<br/><br/>


                                            <button className="btn-outline-warning"  onClick={() => this.Clickl1(l1cat.videochild_id)}>
                                                Level 1 video NO: <h6 className="text-primary">{l1cat.videochild_id}<br/></h6></button>


                                            <button className="btn-outline-warning"  onClick={() => this.Clickl2(l1cat.videochildleveltwo_id)}>
                                                Level 2 video No:<h6 className="text-primary">{l1cat.videochildleveltwo_id}<br/></h6></button>

                                            <button className="btn-outline-warning"  onClick={() => this.Clickl3(l1cat.videochildlevelthree_id)}>
                                                Level 3 video No:<h6 className="text-primary">{l1cat.videochildlevelthree_id}<br/></h6></button>



                            </div>
                        ))}
                    </div></div>

            </div>
        );
    }
}

export default Display;
