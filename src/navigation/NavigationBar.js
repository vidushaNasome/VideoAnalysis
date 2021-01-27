import React from 'react';
import {Nav,NavItem,Navbar,NavDropdown} from 'react-bootstrap';
import {Link} from "react-router-dom";
import './style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import userimg from "../Images/user.png"
import photo1 from "../Images/photo3.jpg";

function NavigationBar() {

    return(
        <div >
            <br/>
            {sessionStorage.getItem("Position") === 'Health Professional'?
                <Nav className="fixed-top" id="navd">
                    <h1 id="heading">CSAAT - Video Analysis </h1>
                    <Nav.Link id="kk" style={{  textDecoration: 'none' }} href="https://CSAAT-WEB.com/user/1"> CSAAT Home </Nav.Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
                <NavDropdown title="Annotating" id="basic-nav-dropdown">
                    <NavDropdown.Item><Link to="/" exact id="nn" style={{  textDecoration: 'none' }}>Main Screen</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/annotateComplete" id="nn" style={{  textDecoration: 'none' }}>Annotation Completed Videos</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/annotateNotComplete" id="nn" style={{  textDecoration: 'none' }}>Yet to be Annotated Videos</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/searchandretrive" id="nn" style={{  textDecoration: 'none' }}>Search and Retrieved</Link></NavDropdown.Item>
                </NavDropdown>
            &nbsp;&nbsp;&nbsp;&nbsp;
                <NavDropdown title="Categories" id="basic-nav-dropdown">
                    <NavDropdown.Item><Link to="/categories" id="nn" style={{  textDecoration: 'none' }}>Main Category</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/categoriesSub" id="nn" style={{  textDecoration: 'none' }}>Sub Category</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/categorieslevel" id="nn" style={{  textDecoration: 'none' }}>Level 3 Category</Link></NavDropdown.Item>
                </NavDropdown>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {sessionStorage.getItem("Username") === null?
                        <div>
                        </div>
                        :<div id="logged1">
                            <img src={userimg}  alt="" height="20" width="20"/>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <h6>{sessionStorage.getItem("Username")}</h6>

                            {/*<button id="logoutbtn">Log Out</button>*/}

                        </div>}

        </Nav>
                :<Nav className="fixed-top" id="navd">
                    <h1 id="heading">CSAAT - Video Analysis </h1>
                    <Nav.Item id="kk" >
                        <a href={"https://CSAAT-WEB.com/user1"}> CSAAT Home </a>
                    </Nav.Item>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Nav.Item>
                        <Link to="/" exact id="nn" style={{ textDecoration: 'none' }}>Main Screen</Link>
                    </Nav.Item>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Nav.Item>
                        <Link to="/searchandretrive" id="nn" style={{ textDecoration: 'none' }}>Search and Retrieve</Link>
                    </Nav.Item>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {sessionStorage.getItem("Username") === null?
                        <div>
                        </div>
                        :<div id="logged2">
                            <img src={userimg}  alt="" height="20" width="20"/>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <h6>{sessionStorage.getItem("Username")}</h6>

                            {/*<button id="logoutbtn">Log Out</button>*/}

                        </div>}


                </Nav>}


        </div>


   );
}
export default NavigationBar;
