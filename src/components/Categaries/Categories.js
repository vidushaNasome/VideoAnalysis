import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './style.css';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class Categories extends Component{
constructor() {
    super()
    this.state = {
        id: '',
        name: ''

    }
    this.onSubmit=this.onSubmit.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this);
}
componentDidMount() {
}

handleInputChange(event){
    this.setState({
        [event.target.name]: event.target.value
    })
}


onSubmit(e){
    e.preventDefault();

}
onSubmit123(id){

}

render() {
    const { tt } = this.state;
    return (
        <div>
            <h1 align="center">Categories Management</h1>
        <div id="addmaincat">
            <div>
                <br/>
                <h3 align="center" id="headingSub">Add Main Categories</h3>
            </div>
            <div align="center">
                <Form className="categoryclass">
                    <Form.Group>
                        <Form.Label>Main Category ID </Form.Label>
                        <Form.Control type="text" placeholder="Main Category ID" />
                    </Form.Group>

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
                    <p>(View Main Categories)</p>
                    <br/><br/>
                </div>
            </div>



        </div>

    )
} }




export default Categories;
