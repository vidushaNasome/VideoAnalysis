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

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Router>
                        <NavigationBar />
                        <Switch>
                            <Route  path="/" exact component={Home}/>


                            <Route  path="/annotateNotComplete" exact component={Analyze}/>
                            <Route  path="/annotateComplete" exact component={Complete}/>

                            <Route  path="/categories" exact component={Categories} />
                            <Route  path="/categoriessub" exact component={CategoriesSub} />
                            <Route  path="/categorieslevel" exact component={Categorieslevel} />

                            <Route  path="/searchandretrive" exact component={SearchAndRetrieve} />
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
