import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import axios from "axios";
import "./style.css";

class Category extends Component{

    constructor(props) {
        super(props);
        this.state = {
            cat: []
        }
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/VideoAnalysis/Categories/")
            .then(response => {
                this.setState({cat: response.data});
                console.log(this.props)

            })
            .catch(function (error) {
                console.log(error);


            })
    }

    render() {
        const {cat}=this.state;
        return (
            <div>
                <br/>   <br/>   <br/>   <br/>   <br/>
                <h1 align="center">Categories Management</h1>
                <div id="addmaincat">
                    <div>
                        <br/>
                        <h3 align="center" id="headingSub">View Categories</h3>
                    </div>
                    <div align="center">

                        <div className="col-md-4">
                            <div className="card text-center font-weight-bold">
                                <div className="card-header text-black">
                            {cat.map((l1cat) => (
                                <div className="user">{l1cat.name}</div>
                            ))}</div></div>
                        </div>

                        <br/><br/><br/>
                    </div>
                </div>

                <div id="addmaincat2">
                    <div align="center">
                        <div className="cat">
                            <h3 align="center" id="headingSub">Go to Categories Pages</h3>
                            <Button id="btnSubmit"><Link to="/categoriesm"  style={{  textDecoration: 'none' ,color:'white' }}>Level 1 Category</Link></Button>
                            <Button id="btnSubmit"><Link to="/categoriessub"  style={{  textDecoration: 'none',color:'white'  }}>Level 2 Category</Link></Button>
                            <Button id="btnSubmit"><Link to="/categorieslevel"  style={{  textDecoration: 'none',color:'white'  }}>Level 3 Category</Link></Button>
                        </div>
                        <br/><br/><br/>
                    </div>
                </div>



            </div>
        );


    }

}
export default Category;
