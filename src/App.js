import React, {Component} from 'react';
import './App.css';
import NavigationBar from "./navigation/NavigationBar";
import {BrowserRouter as Router,Route} from 'react-router-dom';
//import videojs from 'video.js'
import Switch from "react-bootstrap/Switch";
import Analyze from "./components/Annotating/Analyze";
import Categories from "./components/Categaries/Categories";
import SearchAndRetrieve from "./components/SearchAndRetrieve";
import Home from "./components/Home/Home";
import CategoriesSub from "./components/Categaries/CategoriesSub";
import Categorieslevel from "./components/Categaries/CategoriesLevel3";
import Complete from "./components/Annotating/Complete";
import { Redirect } from 'react-router-dom'
import Home1 from "./components/Home/Home1";

class App extends Component {

    constructor(props) {
        super(props);

        this.state={
            loginStatus:''
        }
    }

    componentDidMount() {

        //Logged In as an Authorized Annotator(Health Researcher, Consultant, Officer)
        if(window.location.pathname==="/user/1"){
        sessionStorage.setItem("Username","Ann");
        sessionStorage.setItem("Position","Health Professional");
            this.setState({loginStatus:'loggedInHealthProffesional'})
        }
        //Logged In as Parent
        else if(window.location.pathname==="/user/2"){
            sessionStorage.setItem("Username","Mat");
            sessionStorage.setItem("Position","Parent")
            this.setState({loginStatus:'loggedInParent'})
        }//Normal page without login(Guest Account)
        else{
            sessionStorage.clear();
            this.setState({loginStatus:''})
        }

    }

    render() {
        return (
            <div>
                <div>
                    <Router>
                        <NavigationBar />
                        <Switch>
                            <Route  path="/"  component={Home}/>
                            <Route  path="/annotateNotComplete"  component={Analyze}/>
                            <Route  path="/annotateComplete"  component={Complete}/>

                            <Route  path="/categories"  component={Categories} />
                            <Route  path="/categoriessub"  component={CategoriesSub} />
                            <Route  path="/categorieslevel"  component={Categorieslevel} />

                            <Route  path="/searchandretrive"  component={SearchAndRetrieve} />

                        </Switch>

                    </Router>


                </div>
                <br/>
                <br/>

            </div>
        );
    }
}

export default App;
