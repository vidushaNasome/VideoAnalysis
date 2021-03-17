import React, {Component} from 'react';
import AnnotateVideo from "./AnnotateVideo";
import userimg from "../../Images/user.png";
import './style.css';
import axios from "axios";

class Analyze extends Component{


    constructor(props) {
        super(props);
        this.state = {
            yettoanalyzevideos: [],
        }
    }
    componentDidMount() {
        axios.get("http://127.0.0.1:8000/VideoAnalysis/uploadretrieve/")
            .then(response => {
                this.setState({yettoanalyzevideos: response.data});
                console.log(this.props)

            })
            .catch(function (error) {
                console.log(error);


            })

    }

    render() {
        const {yettoanalyzevideos}=this.state;
        return(<div>
            <div id="leftxx">
            {yettoanalyzevideos.map((video) => (
                <div id="main12">
                    {(video.id % 2) === 1?
                       <div id="left2">
                           <AnnotateVideo name={video.name} url={video.video} id={video.id}/>
                       </div>

                        :<div></div>}
                </div>
                ))}
            </div>

            <div id="rightxx">
                {yettoanalyzevideos.map((video) => (
                    <div id="main12">
                        {(video.id % 2) != 1?
                            <div id="right2">
                                <AnnotateVideo name={video.name} url={video.video} id={video.id}/>
                            </div>

                            :<div></div>}
                    </div>
                ))}
            </div>

        </div>);
    }

}
export default Analyze;
