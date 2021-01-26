import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './style.css';

class Categories extends Component{
constructor() {
    super()
    this.state = {
        name: '',
        price: '',
        cat:'',
        tt:[],
        pp:'',
        code:'',
        tel:''
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
            <div>
                <h1 align="center">Categories Management</h1>
                <h3 align="center">Add Main Categories</h3>
            </div>
            <div align="center">
                <form align="center" onSubmit={this.onSubmit} >
                    <label>Id </label>
                    <input id='name'
                           onChange={this.handleInputChange} name='name' type='text'
                           value={this.state.name["name"]} required/><br/><br/>
                    <label>Main Category</label>
                    <input id='tel'
                           onChange={this.handleInputChange} name='tel' type='number'
                           value={this.state.tel["tel"]} required/><br/><br/>
                           <button id="submitbtn"> Submit </button>
                    <br/><br/>
                </form>
            </div>

            <div className="container">
                <table className="alert alert-primary" align="center" id="c12" width="90%">
                    {tt.map((post) => (
                        <div className="alert-heading">
                            <tr><td width="10%">Name<div className="card-header"> {post.name} </div></td>
                                <td width="40%">Category and Details<div className="card-header"> {post.category} </div></td>
                                <td width="20%">Contact Number<div className="card-header"> {post.tel} </div></td>
                                <td width="20%">Budget<div className="card-body"><p className="card-text">Rs.{post.price}.00</p></div></td>
                                <td width="10%"><input id='code' placeholder="Insert code to delete this detail" onChange={this.handleInputChange} name='code' type='text'
                                                       value={this.state.code["code"]}/></td>
                                <button width="20%" className="btn-danger" type="submit"
                                        onClick={this.onSubmit123.bind(this,post._id)} >delete</button>
                                <td></td>
                            </tr>

                        </div>
                    ))}
                </table>
            </div>



        </div>

    )
} }




export default Categories;
