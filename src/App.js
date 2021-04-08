import React, {Component} from 'react';
import './App.css';
import NavigationBar from "./navigation/NavigationBar";
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Switch from "react-bootstrap/Switch";
import Analyze from "./components/AnnotatingDisplay/Analyze";
import CategoryLevel1 from "./components/Categaries/CategoryLevel1";
import SearchAndRetrieve from "./components/SearchAndRetrieve";
import Home from "./components/Home/Home";
import CategoriesLevel2 from "./components/Categaries/CategoriesLevel2";
import Categorieslevel3 from "./components/Categaries/CategoriesLevel3";
import Complete from "./components/AnnotatingDisplay/Complete";
//import { Redirect } from 'react-router-dom'
import Home1 from "./components/Home/Home1";
import Footer from "./navigation/Footer";
import Category from "./components/Categaries/Category";
import Annotatemain from "./components/AnnotatingDisplay/Annotatemain";
import MainVideo from "./components/VideoAnnotating/MainVideo";
import Level1Annotations from "./components/VideoAnnotating/Level1Annotations";
import Level2Annotations from "./components/VideoAnnotating/level2Annotations/Level2Annotations";
import Level3Annotations from "./components/VideoAnnotating/level3Annotations/Level3Annotations";

//import BrowserHistory from'react-router';

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
            //Guest Account
            /*sessionStorage.clear();
            this.setState({loginStatus:''})*/
        }

    }

    render() {
        //localStorage.clear();
        return (
            <div>
                <div>
                    <Router>
                        <NavigationBar />
                        <Switch>
                            <Route  path="/" exact  component={Home}/>
                            <Route  path="/user/"   component={Home}/>
                            <Route  path="/annotate" exact component={Annotatemain}/>
                            <Route  path="/annotateNotComplete" exact  component={Analyze}/>
                            <Route  path="/annotateComplete" exact  component={Complete}/>
                            <Route  path="/level1"  component={Level1Annotations}/>
                            <Route  path="/level2"  component={Level2Annotations}/>
                            <Route  path="/level3"  component={Level3Annotations}/>
                            <Route  path="/annotateVideo"  component={MainVideo}/>
                            <Route  path="/categories" exact component={Category} />
                            <Route  path="/categoriesm" exact component={CategoryLevel1} />
                            <Route  path="/categoriessub" exact  component={CategoriesLevel2} />
                            <Route  path="/categorieslevel" exact component={Categorieslevel3} />
                            <Route  path="/searchandretrive" exact  component={SearchAndRetrieve} />

                        </Switch>

                    </Router>
                    <br/>
                    <br/><br/>
                    <Footer/>

                </div>
                <br/>
                <br/>

            </div>
        );
    }
}

export default App;
