import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import axios from "axios";
import "./style.css";

class CategoryMain extends Component{

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/5")
            .then(response => {
                this.setState({categories: response.data});
                console.log("checkig"+this.state)
            })
            .catch(function (error) {
                console.log(error);

            })
    }

    render() {
        const {categories}=this.state;
        const list =this.state.categories.map((post) => {
                return (
                    <tr key={post.id}>
                        <td className="text-truncate" id="cs">{post.mc_id}</td>
                        <td className="text-truncate" id="cs">{post.name}</td>
                    </tr>
                )
            }
        );
        return(
            <div><br/>   <br/>   <br/>   <br/>   <br/>
                <h1 align="center">Categories Management</h1>
                <div id="addmaincat">
                    <div>
                        <br/>
                        <h3 align="center" id="headingSub">View Categories</h3>
                    </div>
                    <div align="center">

                        <br/><br/><br/>
                    </div>
                </div>

                <div id="addmaincat2">
                    <div align="center">
                        <div className="cat">
                            <h3 align="center" id="headingSub">Go to Categories Pages</h3>
                            <Button id="btnSubmit"><Link to="/categoriesm"  style={{  textDecoration: 'none' ,color:'white' }}>Main Category</Link></Button>
                            <Button id="btnSubmit"><Link to="/categoriessub"  style={{  textDecoration: 'none',color:'white'  }}>Sub Category</Link></Button>
                            <Button id="btnSubmit"><Link to="/categorieslevel"  style={{  textDecoration: 'none',color:'white'  }}>Level 3Category</Link></Button>
                        </div>
                        <br/><br/><br/>
                    </div>
                </div>



            </div>
        );


    }

}
export default CategoryMain;
