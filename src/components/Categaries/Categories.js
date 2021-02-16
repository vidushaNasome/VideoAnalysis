import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './style.css';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";

class Categories extends Component{
    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            cat: []

        }
        this.onSubmit=this.onSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
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

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();
        alert("working");

    }
    onSubmit123(id){

    }

    render() {
    const { tt } = this.state;
    const {cat}=this.state;
    return (
        <div className="xx">
            <h1 align="center">Categories Management</h1>
            <Button id="btnSubmit"><Link to="/categories"  style={{  textDecoration: 'none', color:'white'  }}>Category Main Page</Link></Button>
        <div id="addmaincat">
            <div>
                <br/>
                <h3 align="center" id="headingSub">Add Main Categories</h3>
            </div>
            <div align="center">
                <Form className="categoryclass" onSubmit={this.onSubmit()}>
                    <Form.Group>
                        <Form.Label>Main Category</Form.Label>
                        <Form.Control type="text" placeholder="Type Main Category" />
                    </Form.Group>
                    <Button id="btnSubmit" variant="primary" type="submit">
                        Add Main Category
                    </Button>
                </Form>
                <br/><br/>
            </div>
        </div>

            <div id="addmaincat">
                <div>
                    <br/>
                    <h3 align="center" id="headingSub">View Main Categories</h3>
                </div>
                <div align="center">

                    <div className="users">
                        {cat.map((l1cat) => (
                            <div className="user">{l1cat.id}{l1cat.name}</div>
                        ))}
                    </div>

                    <br/><br/>
                </div>
            </div>



        </div>

    )
} }




export default Categories;
