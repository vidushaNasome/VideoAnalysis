import React, {Component} from 'react';
import AnnotateVideo from "./AnnotateVideo";
import userimg from "../../Images/user.png";
import video1 from "../../Video_Store/ChildVideo1.mp4"
import video2 from "../../Video_Store/ChildVideo2.mp4"
import './style.css';

class Analyze extends Component{


    constructor(props) {
        super(props);
        this.state = {
            yettoanalyzevideos: [{id:1,src:video1,name:'video1'},{id:2,src:'yyyyyyyyyy',name:'tttttttt'},{id:3,src:video2,name:'video3'},
                {id:4,src:'rrrrrrrrrr',name:'video4'},{id:5,src:'rrrrrrrrrr',name:'video5'},{id:6,src:'rrrrrrrrrr',name:'video5'},
                {id:7,src:'rrrrrrrrrr',name:'video5'}],
        }
    }

    render() {
        const {yettoanalyzevideos}=this.state;
        return(<div>
            <div id="leftxx">
            {yettoanalyzevideos.map((video) => (
                <div id="main12">
                    {(video.id % 2) === 1?
                       <div id="left2">
                           <AnnotateVideo name={video.src} id={video.id}/>
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
                                <AnnotateVideo name={video.src} id={video.id}/>
                            </div>

                            :<div></div>}
                    </div>
                ))}
            </div>

        </div>);
    }

}
export default Analyze;
