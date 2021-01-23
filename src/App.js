import React, {Component} from 'react';
import './App.css';
import NavigationBar from "./navigation/NavigationBar";
import {BrowserRouter as Router,Route} from 'react-router-dom';
//import videojs from 'video.js'
import Switch from "react-bootstrap/Switch";
import Analyze from "./components/Analyze";
import Categories from "./components/Categories";
import SearchAndRetrieve from "./components/SearchAndRetrieve";
import Home from "./components/Home";

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Router>
                        <NavigationBar />
                        <Switch>
                            <Route  path="/" exact component={Home}/>
                            <Route  path="/analyze" exact component={Analyze} />
                            <Route  path="/categories" exact component={Categories} />
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
