import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {confirmAlert} from "react-confirm-alert";
import {itIT} from "@material-ui/core/locale";

class CategoriesLevel3 extends Component{

    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            mainCategories: [],
            mainCategoriesLevel2: [],
            cat2:[],
            cat1_2:[
                {
                    cat1:{},
                    cat2:{}
                }
            ],
            select:{},
            selectedTrue:false,
            res:''

        }
        this.onSubmit=this.onSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.selectlevel1=this.selectlevel1.bind(this);
    }
    componentDidMount() {
        axios.get("http://127.0.0.1:8000/VideoAnalysis/Categories/")
            .then(response => {
                this.setState({mainCategories: response.data});
            } )
            .catch(function (error) {
                console.log(error);

            })

        axios.get("http://127.0.0.1:8000/VideoAnalysis/CategoriesThree/")
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
        //let res = this.l1categoryid.value;
        let res2 = this.l1categoryid2.value;
        //alert(res)
        axios.post('http://127.0.0.1:8000/VideoAnalysis/CategoriesThree/', {
            name: this.name,
            category_level1: this.state.res,
            category_level2: res2

        })
            .then(function (response) {
                console.log(response);
                window.location.reload();

            })



    }
    selectlevel1(e){
        e.preventDefault();
        let res = this.l1categoryid.value;
        //alert('hello '+res)
        this.setState({res: res});

        axios.get("http://127.0.0.1:8000/VideoAnalysis/Categories/"+res)
            .then(response => {
                this.setState({select: response.data});
                this.setState({selectedTrue: true});
                //alert(this.state.select.name)
            } )
            .catch(function (error) {
                console.log(error);

            })

        axios.get("http://127.0.0.1:8000/VideoAnalysis/CategoriesTwo/?id="+res)
            .then(response => {
                this.setState({mainCategoriesLevel2: response.data});
            } )
            .catch(function (error) {
                console.log(error);

            })



    }
    onDeleteClick(id){
        console.log("id:"+id);
        confirmAlert({
            title: 'Confirm to Delete Level 3 Category',
            message: 'Are you Sure you want to delete this Category?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axios.delete("http://127.0.0.1:8000/VideoAnalysis/CategoriesThree/" + id+ "/").then((response) => {
                        window.location.replace("/categorieslevel")
                    })
                },
                {
                    label: 'No',

                }
            ]
        });


    }

    render() {
        const {cat2}=this.state;
        const { mainCategories } = this.state;
        const { selectedTrue } = this.state;
        const { select } = this.state;
        const { mainCategoriesLevel2 } = this.state;

        let mainCategoriesList = mainCategories.length > 0
            && mainCategories.map((item, i) => {
                return (
                    <option key={i} value={item.id}>{item.name}</option>
                )
            }, this);

        let CategoriesLevel2List = mainCategoriesLevel2.length > 0
            && mainCategoriesLevel2.map((item, i) => {
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
                        <h3 align="center" id="headingSub">Add Level 3 Categories</h3>
                    </div>
                    <div align="center">
                        <Form className="categoryclass" onSubmit={this.onSubmit}>
                            {selectedTrue === true ? <div>
                                    <h5>Selected Level-1-Category: {select.name}</h5><br/>
                                    <Form.Group>
                                        <Form.Label>Select Level 2 Category </Form.Label><br/>
                                        <select id="selectmain2" variant="primary" ref = {(input)=> this.l1categoryid2 = input}>
                                            >
                                            {CategoriesLevel2List}
                                        </select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Level 3 Category</Form.Label>
                                        <Form.Control type="text"
                                                      placeholder="Type Level 3 Category"
                                                      name="name"
                                                      onChange={this.handleInputChange}
                                                      value={this.state.name}
                                        />
                                    </Form.Group>
                                    <Button id="btnSubmit" variant="primary" type="submit">
                                        Add Category
                                    </Button>
                                </div>

                                : <div><Form.Group>
                                    <Form.Label>Select Level 1 Category</Form.Label>
                                    <select id="selectmain" variant="primary" ref = {(input)=> this.l1categoryid = input}>
                                        >
                                        {mainCategoriesList}
                                    </select>
                                </Form.Group>

                                <Button id="btnSubmit" variant="primary" onClick={this.selectlevel1}>
                                Select Level 1 Category
                                </Button></div>

                            }


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
                        <p>View Level-3-Categories</p>
                        <div className="catelevel1dis">
                            {cat2.map((l1cat) => (
                                <div className="col-md-4">
                                    <div className="card text-center font-weight-bold">
                                        <div className="card-header text-black">
                                            Level-1-Catgeory ID:{l1cat.category_level1} <br/>
                                            Level-2-Category ID:{l1cat.category_level2} <br/>
                                            Level-3-Category ID:{l1cat.name}<br/>
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
export default CategoriesLevel3;

