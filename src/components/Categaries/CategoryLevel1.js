import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './style.css';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {categoriesAPI} from '../../configs/config';

class CategoryLevel1 extends Component{
    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            cat: [],
            update:{},
            show:false,
            show_main:true,

        }
        this.onSubmit=this.onSubmit.bind(this);
        this.update=this.update.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.onUpdateClick=this.onUpdateClick.bind(this);
    }
    componentDidMount() {

        axios.get(categoriesAPI)
            .then(response => {
                this.setState({cat: response.data});
                console.log(this.props)

            })
            .catch(function (error) {
                console.log(error);


            })
    }
   /* submitDelete = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => alert('Click Yes')
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });
    };*/

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();
        this.name=this.state.name;
        axios.post(categoriesAPI, {
            name: this.name

        })
            .then(function (response) {
                console.log(response);
                window.location.reload();

            })


    }
    onDeleteClick(id){
        console.log("id:"+id);
        if("Consultant"===sessionStorage.getItem("Position")){
        confirmAlert({
            title: 'Confirm to Delete Level 1 Category',
            message: 'Are you Sure you want to delete this Category?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axios.delete( categoriesAPI+ id+ "/").then((response) => {
                                    window.location.replace("/categoriesm")
                    })
                },
                {
                    label: 'No',

                }
            ]
        });}else{
            alert("You dont have access priviledges.")
        }


    }
    update(){
        alert('here')
        axios.put(categoriesAPI + this.state.update.id+'/', {
            name: this.state.name
        }).then(function (response) {
            console.log(response);
            window.location.reload();

        })
    }
    onUpdateClick(id){
        console.log("id:"+id);
        if("Consultant"===sessionStorage.getItem("Position")){

            axios.get(categoriesAPI+id)
                .then(response => {
                    this.setState({update: response.data});
                    this.setState({name:response.data.name})
                    this.setState({show:true})
                    this.setState({show_main:false})
                    console.log(this.props)


                })
                .catch(function (error) {
                    console.log(error);


                })



        }else{
            alert("You dont have access priviledges.")
        }


    }
    render() {
    const { tt } = this.state;
    const {cat}=this.state;
    return (
        <div className="xx"><br/><br/><br/>
            <h1 align="center">Categories Management</h1>
            <Button id="btnSubmit"><Link to="/categories"  style={{  textDecoration: 'none', color:'white'  }}>Category Main Page</Link></Button>
        <div id="addmaincat">
            <div>
                <br/>
                <h3 align="center" id="headingSub">Add Level 1 Categories</h3>
            </div>
            <div align="center">
                <Form className="categoryclass" onSubmit={this.onSubmit} >
                    <Form.Group>
                        <Form.Label>Main Category</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Type Main Category"
                                      onChange={this.handleInputChange}
                                      value={this.state.name}
                                      name="name"

                        />
                    </Form.Group>
                    {this.state.show_main?
                        <Button id="btnSubmit" variant="primary" type="submit">
                            Add Category
                        </Button>
                    :null}

                </Form>
                {this.state.show ?
                    <div><Button variant="primary" onClick={this.update}>Update </Button></div>
                    :null
                }

                <br/><br/>
            </div>
        </div>

            <div id="addmaincat">
                <div>
                    <br/>
                    <h3 align="center" id="headingSub">View Level 1 Categories</h3>
                </div>
                <div align="center">

                    <div className="catelevel1dis">
                        {cat.map((l1cat) => (
                            <div className="col-md-4">
                                <div className="card text-center font-weight-bold">
                                    <div className="card-header text-black">
                                <tr className="row">{l1cat.name}
                                <button className="btn-primary" id="cardbtn" onClick={() => this.onUpdateClick(l1cat.id)}>Update</button>
                                <button className="btn-danger"  onClick={() => this.onDeleteClick(l1cat.id)}> Delete </button></tr>
                                    </div></div>
                            </div>
                        ))}
                    </div>

                    <br/><br/>
                </div>
            </div>



        </div>

    )
} }




export default CategoryLevel1;
