import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {confirmAlert} from "react-confirm-alert";
import {categoriesAPI} from '../../configs/config';
import {categoriesLevel2API} from '../../configs/config';

class CategoriesLevel2 extends Component{

    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            mainCategories: [],
            cat2:[]

        }
        this.onSubmit=this.onSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
    }
    componentDidMount() {
        axios.get(categoriesAPI)
            .then(response => {
                this.setState({mainCategories: response.data});
            } )
            .catch(function (error) {
                console.log(error);

            })
        axios.get(categoriesLevel2API)
            .then(response => {
                this.setState({cat2: response.data});
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
        this.name=this.state.name;
        //this.catid = this.state.catid;
        let res = this.l1categoryid.value;
        //alert(res)
        axios.post(categoriesLevel2API, {
            name: this.name,
            category_level1: res

        })
            .then(function (response) {
                console.log(response);
                window.location.reload();

            })



    }
    onSubmit123(id){

    }
    onDeleteClick(id){
        console.log("id:"+id);
        confirmAlert({
            title: 'Confirm to Delete Level 2 Category',
            message: 'Are you Sure you want to delete this Category?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axios.delete(categoriesLevel2API + id+ "/").then((response) => {
                        window.location.replace("/categoriessub")
                    })
                },
                {
                    label: 'No',

                }
            ]
        });


    }

    render() {
        const { tt } = this.state;
        const {cat2}=this.state;
        const { mainCategories } = this.state;

        let mainCategoriesList = mainCategories.length > 0
            && mainCategories.map((item, i) => {
                return (
                    <option key={i} value={item.id}>{item.name}</option>
                )
            }, this);


        return (
            <div className="xx">
                <br/><br/><br/>
                <h1 align="center">Categories Management</h1>
                <Button id="btnSubmit"><Link to="/categories"  style={{  textDecoration: 'none',color:'white'  }}>Category Main Page</Link></Button>
                <div id="addmaincat">
                    <div>
                        <br/>
                        <h3 align="center" id="headingSub">Add Level 2 Categories</h3>
                    </div>
                    <div align="center">
                        <Form className="categoryclass" onSubmit={this.onSubmit}>
                            <Form.Group>
                               <Form.Label>Select Level 1 Category </Form.Label>
                               <select id="selectmain" variant="primary" ref = {(input)=> this.l1categoryid = input}>
                                  >
                                   {mainCategoriesList}
                               </select>
                           </Form.Group>

                            <Form.Group>
                                <Form.Label>Level 2 Category</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Type Level 2 Category"
                                              name="name"
                                              onChange={this.handleInputChange}
                                              value={this.state.name}
                                />
                            </Form.Group>
                            <Button id="btnSubmit" variant="primary" type="submit">
                                Add Category
                            </Button>
                        </Form>
                        <br/><br/>
                    </div>
                </div>

                <div id="addmaincat">
                    <div>
                        <br/>
                        <h3 align="center" id="headingSub">Level 2 Categories</h3>
                    </div>
                    <div align="center">
                        <p>View Level-2-Categories</p>
                        <div className="catelevel1dis">
                            {cat2.map((l1cat) => (
                                <div className="col-md-4">
                                    <div className="card text-center font-weight-bold">
                                        <div className="card-header text-black">
                                            Level-1-Catgeory: ID: {l1cat.category_level1}  <br/>
                                            Level-2-Category:{l1cat.name}<br/>
                                            <button className="btn-primary" id="cardbtn">Update</button>
                                            <button className="btn-danger"  onClick={() => this.onDeleteClick(l1cat.id)}> Delete </button>
                                        </div></div>
                                </div>
                            ))}
                            <br/><br/>
                        </div>
                    </div>
                </div>

                <div align="center">



                    <br/><br/>
                </div>



            </div>

        )
    }

}
export default CategoriesLevel2;
