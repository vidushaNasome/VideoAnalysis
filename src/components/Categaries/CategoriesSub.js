import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

class CategoriesSub extends Component{

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
        this.setState({
            mainCategories: [
                {id: 1, name: 'Child Playing with mother'},
                {id: 2, name: 'xxxxx'},
                {id: 3, name: 'yyyyy'}
            ]
        });

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
                <h1 align="center">Categories Management</h1>
                <Button id="btnSubmit"><Link to="/categories"  style={{  textDecoration: 'none',color:'white'  }}>Category Main Page</Link></Button>
                <div id="addmaincat">
                    <div>
                        <br/>
                        <h3 align="center" id="headingSub">Add Sub Categories</h3>
                    </div>
                    <div align="center">
                        <Form className="categoryclass">
                            <Form.Group>
                                <Form.Label>Sub Category ID </Form.Label>
                                <Form.Control type="text" placeholder="Main Category ID" />
                            </Form.Group>
                           <Form.Group>
                               <Form.Label>Select Main Category </Form.Label>
                               <select id="selectmain" variant="primary">
                                   {mainCategoriesList}
                               </select>
                           </Form.Group>

                            <Form.Group>
                                <Form.Label>Sub Category</Form.Label>
                                <Form.Control type="text" placeholder="Type Sub Category" />
                            </Form.Group>
                            <Button id="btnSubmit" variant="primary" type="submit">
                                Add Sub Category
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
export default CategoriesSub;
