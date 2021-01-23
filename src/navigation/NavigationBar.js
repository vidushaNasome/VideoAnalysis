import React from 'react';
import {Nav,NavItem,Navbar,NavDropdown} from 'react-bootstrap';
import {Link} from "react-router-dom";
import './style.css';
import "bootstrap/dist/css/bootstrap.min.css";

function NavigationBar() {

    return(
        <div>
            <br/>
            <Nav>
                <h1 id="heading">Video Analysis - CSAAT </h1>
                <Nav.Item id="kk">
                    <a href={"https://example.com/"}>Home</a>
            </Nav.Item>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Item>
                <Link to="/analyze" id="nn" style={{  textDecoration: 'none' }}>Analyze</Link>
            </Nav.Item>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Item>
                <Link to="/categories" id="nn" style={{ textDecoration: 'none' }}>Categories</Link>
            </Nav.Item>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Item>
                <Link to="/searchandretrive" id="nn" style={{ textDecoration: 'none' }}>Search and Retrieve</Link>
            </Nav.Item>
            &nbsp;&nbsp;&nbsp;&nbsp;
                {/*<Nav.Item>
                    <Link to="/xx" id="nn" style={{  textDecoration: 'none' }}>(video gathering)</Link>
                </Nav.Item>
                &nbsp;&nbsp;&nbsp;&nbsp;*/}

        </Nav>

        </div>


   );
}
export default NavigationBar;
