import React from 'react';
import {Nav,NavItem,Navbar,NavDropdown} from 'react-bootstrap';
import {Link} from "react-router-dom";
import './style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import userimg from "../Images/user.png"
import logo from "../Images/logo.png";
import {csaat_web} from "../configs/config";
import ReactTooltip from "react-tooltip";


function NavigationBar() {

    return(
        <div >
            <br/>
            {sessionStorage.getItem("ENABLE") === 'YES' ?
                <Nav className="fixed-top" id="navd">
                    <h1 id="heading"><img src={logo} className="mr-3" alt=""/>CSAAT - Video Analysis </h1>
                    <Nav.Link id="kk" style={{  textDecoration: 'none' }} href={csaat_web+'user/1'}> CSAAT Home </Nav.Link>
                    <Link to="/user/" id="nn" style={{  textDecoration: 'none' }}>Home</Link>
                    <Link to="/annotate" id="nn" style={{  textDecoration: 'none' }}>Annotate</Link>
                    <Link to="/categories" id="nn" style={{  textDecoration: 'none' }}>Category</Link>
                    {/*<Nav.Link to="/searchandretrive" id="nn" style={{  textDecoration: 'none' }}>Search</Nav.Link>*/}
                    {sessionStorage.getItem("Username") === null?
                        <div>
                        </div>
                        :<div id="logged1">
                            <div className="align-content-left">
                                <p data-tip={'UserName:'+ sessionStorage.getItem("Username")+'\n Position:'+sessionStorage.getItem("Position")} >
                                <img src={userimg}  alt="" height="20" width="20"/></p>
                                <ReactTooltip multiline={true}/></div>
                            <button id="logoutbtn" onClick={onClickMethod}>Log Out</button>
                        </div>}

        </Nav>
                :<Nav className="fixed-top" id="navd">
                    <h1 id="heading"><img src={logo} className="mr-3" alt=""/>CSAAT - Video Analysis </h1>>
                    <br/>
                    <Nav.Link id="kk" style={{  textDecoration: 'none' }} href={csaat_web+'user/1'}> CSAAT Home </Nav.Link>
                    <Link to="/" exact id="nn" style={{ textDecoration: 'none' }}>Home</Link>
                    <Link to="/searchandretrive" id="nn" style={{ textDecoration: 'none' }}>Search and Retrieve</Link>


                    {sessionStorage.getItem("Username") === null?
                        <div>
                        </div>
                        :<div id="logged2"><br/>
                            <p data-tip={'UserName:'+ sessionStorage.getItem("Username")+'\n Position:'+sessionStorage.getItem("Position")} >
                            <img src={userimg}  alt="" height="20" width="20" />
                            </p>
                            <button id="logoutbtn" className="h6"  onClick={onClickMethod}>Log Out</button>
                            <ReactTooltip multiline={true}/>


                        </div>}


                </Nav>}


        </div>


   );
}
function onClickMethod(){
    sessionStorage.clear();
    window.location.replace("https://CSAAT-WEB.com/");

}
export default NavigationBar;
