import React,{Component} from 'react';
import {Modal,Button,Row, Col,Form} from 'react-bootstrap';
import VideoPlayer from "react-video-js-player";
import {Link} from "react-router-dom";
import axios from "axios";
import {categoriesAPI} from "../../configs/config";
import PropTypes from "prop-types";

export class MarkAnnotateCompleteModel extends Component{
    static get propTypes() {
        return {
            id: PropTypes.string,

        }
    }
    constructor(props) {
        super(props);

        this.state = {
            videoid:this.props.id,
            name:'',
            position:'',
            date:'',
            comments:'',
            id:'',

        }

        this.onSubmit=this.onSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
    }
    componentDidMount() {
        this.setState({id:sessionStorage.getItem('id')})
        this.setState({name:sessionStorage.getItem('Username')})
        this.setState({position:sessionStorage.getItem('Position')})
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
                                                 value={this.state.videoid}
                                                 name="videoid"
                                                 readonly="readonly"


                                   />
                               </Form.Group>
                           <Form.Group>
                               <Form.Label>Annotator ID</Form.Label>
                               <Form.Control type="text"
                                             placeholder="Annotator ID"
                                             onChange={this.handleInputChange}
                                             value={this.state.id}
                                             name="id"
                                             readonly="readonly"


                               />
                           </Form.Group>
                           <Form.Group>
                               <Form.Label>Annotator Name</Form.Label>
                               <Form.Control type="text"
                                             placeholder="Annotator Name"
                                             onChange={this.handleInputChange}
                                             value={this.state.name}
                                             name="name"
                                             readonly="readonly"


                               />
                           </Form.Group>
                           <Form.Group>
                               <Form.Label>Annotator Level</Form.Label>
                               <Form.Control type="text"
                                             placeholder="Annotator Level"
                                             onChange={this.handleInputChange}
                                             value={this.state.position}
                                             name="position"
                                             readonly="readonly"

                               />
                           </Form.Group>
                           <Form.Group>
                               <Form.Label>Date</Form.Label>
                               <Form.Control type="date"
                                             onChange={this.handleInputChange}
                                             value={this.state.date}
                                             name="date"

                               />
                               <Form.Group>
                                   <Form.Label>Any Other Comments</Form.Label>
                                   <Form.Control type="text"
                                                 placeholder="Type Comments here"
                                                 onChange={this.handleInputChange}
                                                 value={this.state.comments}
                                                 name="comments"

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
