import React, {Component} from 'react';
import AnnotateVideo from "./AnnotateVideo";

class Analyze extends Component{


    constructor(props) {
        super(props);
        this.state = {
            yettoanalyzevideos: [{id:1,src:'wwwwww',name:'video1'},{id:2,src:'yyyyyyyyyy',name:'video2'},{id:3,src:'aaaaaaaaaaaa',name:'video3'},
                {id:4,src:'rrrrrrrrrr',name:'video4'}],
        }
    }

    render() {
        const {yettoanalyzevideos}=this.state;
        return(
            <div> <br/>
            <div className="container-fluid">
                <div className="row-cols-md-2">
                    <div className="card text-center font-weight-bold">
                        <div className="card-header text-black"><br/><br/>
                    {yettoanalyzevideos.map((video) => (
                        <AnnotateVideo name={video.name} id={video.id}/>

                    ))}</div></div></div>
                </div>





            </div>
        );
    }

}
export default Analyze;
