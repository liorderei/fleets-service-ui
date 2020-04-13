import React from 'react';
import './App.css';
import FleetTable from "./fleets/fleets";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Devices from "./devices/Devices";


function App() {
    return (
        <Router>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/fleet" component={(props) => Devices(props)}/>
                <Route path="/">
                    <FleetTable/>
                </Route>
            </Switch>
        </Router>

    );
}

export default App;

