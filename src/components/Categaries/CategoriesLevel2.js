import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

class CategoriesLevel2 extends Component{

    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            mainCategories: []

        }
        this.onSubmit=this.onSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
    }
    componentDidMount() {
        axios.get("http://127.0.0.1:8000/VideoAnalysis/Categories/")
            .then(response => {
                this.setState({mainCategories: response.data});
            } )
            .catch(function (error) {
                console.log(error);

            })
        /*this.setState({
            mainCategories: [
                {id: 1, name: 'Child Playing with mother'},
                {id: 2, name: 'xxxxx'},
                {id: 3, name: 'yyyyy'}
            ]
        });*/

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
                        <Form className="categoryclass">
                            <Form.Group>
                               <Form.Label>Select Level 1 Category </Form.Label>
                               <select id="selectmain" variant="primary">
                                   {mainCategoriesList}
                               </select>
                           </Form.Group>

                            <Form.Group>
                                <Form.Label>Level 2 Category</Form.Label>
                                <Form.Control type="text" placeholder="Type Sub Category" />
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
                        <h3 align="center" id="headingSub">View Sub Categories</h3>
                    </div>
                    <div align="center">
                        <p>(View Sub Categories)</p>
                        <br/><br/>
                    </div>
                </div>



            </div>

        )
    }

}
export default CategoriesLevel2;
