import React,{Component} from 'react';
import {Modal,Button,Row, Col,Form} from 'react-bootstrap';
import VideoPlayer from "react-video-js-player";
import {Link} from "react-router-dom";
import axios from "axios";
import {categoriesAPI} from "../../configs/config";

export class MarkAnnotateCompleteModel extends Component{
    constructor(props) {
        super(props);

        this.state = {

        }

        this.onSubmit=this.onSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
    }
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


    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Mark Annotation Completed
                    </Modal.Title><br/>

                </Modal.Header>
                <Modal.Body>
                    <h7 style={{ color:'red' }}>
                       **Make Sure to fill this form only if you have done all the annotations for a Particular Child Video.**
                    </h7>
                   <div className="container">
                       <Form className="form" onSubmit={this.onSubmit} >
                               <Form.Group>
                                   <Form.Label>Video ID</Form.Label>
                                   <Form.Control type="text"
                                                 placeholder="Video ID"
                                                 onChange={this.handleInputChange}
                                                 value={this.state.name}
                                                 name="name"

                                   />
                               </Form.Group>
                           <Form.Group>
                               <Form.Label>Annotator ID and Name</Form.Label>
                               <Form.Control type="text"
                                             placeholder="Annotator ID"
                                             onChange={this.handleInputChange}
                                             value={this.state.name}
                                             name="name"

                               />
                           </Form.Group>
                           <Form.Group>
                               <Form.Label>Annotator Level</Form.Label>
                               <Form.Control type="text"
                                             placeholder="Annotator Level"
                                             onChange={this.handleInputChange}
                                             value={this.state.name}
                                             name="name"

                               />
                           </Form.Group>
                           <Form.Group>
                               <Form.Label>Date</Form.Label>
                               <Form.Control type="date"
                                             onChange={this.handleInputChange}
                                             value={this.state.name}
                                             name="name"

                               />
                               <Form.Group>
                                   <Form.Label>Any Other Comments</Form.Label>
                                   <Form.Control type="text"
                                                 placeholder="Type Comments here"
                                                 onChange={this.handleInputChange}
                                                 value={this.state.name}
                                                 name="name"

                                   />
                               </Form.Group>
                           </Form.Group>
                               <Button id="btnSubmit" variant="primary" type="submit">
                                   Mark Complete and Submit
                               </Button>

                           </Form>



                   </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close This Form</Button>
                    <Button>
                        Download this File Folder
                    </Button>
                    <Button>
                        View this File Folder
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
