import React, {Component} from 'react';
import axios from "axios";
import qs from "query-string";

class MainVideo extends Component {

    componentDidMount() {
        alert(qs.parse(this.props.location.search, { ignoreQueryPrefix: true })._k);
       /* axios.get('https://backend-280306.uc.r.appspot.com/api/categories/' +qs.parse(this.props.location.search, { ignoreQueryPrefix: true })._k)
            .then(response => {

                this.setState({
                    id: response.data.id,
                    cName: response.data.cName,
                    cType: response.data.cType,
                    cDate: response.data.cDate

                })


            })
            .catch(function (error) {
                console.log(error)

            })*/
    }


    render() {
        return (
            <div><br/><br/><br/><br/>
                Main Video
            </div>
        );
    }
}

export default MainVideo;
