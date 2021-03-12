import React, {Component} from 'react';
import TimeRangeSlider from 'react-time-range-slider';

class Timeline extends Component {

    constructor(props) {
        super(props);
        this.featureRef = React.createRef();
        this.changeStartHandler = this.changeStartHandler.bind(this);
        this.timeChangeHandler = this.timeChangeHandler.bind(this);
        this.changeCompleteHandler = this.changeCompleteHandler.bind(this);

        this.state = {
            value: {
                start: "00:00:00",
                end: "23:59:00"
            },
            max:'',
            min:'',
        }

    }

    changeStartHandler(time){
        console.log("Start Handler Called", time);
    }

    timeChangeHandler(time){


        this.setState({
            value: time
        });
        console.log("wwwwwwwwww"+this.state.value)
    }

    changeCompleteHandler(time){
        console.log("Complete Handler Called", time);
    }


    render() {
        const {value} = this.state;
        return (
            <div>
                <br/>
                Selected Start Time : {value.start}  <br/>

                Selected Start Time : {value.end}   <br/>

                <TimeRangeSlider
                    disabled={false}
                    format={24}
                    maxValue={"23:59:00"}
                    minValue={"00:00:00"}
                    name={"time_range"}
                    onChangeStart={this.changeStartHandler}
                    onChangeComplete={this.changeCompleteHandler}
                    onChange={this.timeChangeHandler}
                    step={15}
                    value={this.state.value}/>
            </div>
        );
    }
}

export default Timeline;


