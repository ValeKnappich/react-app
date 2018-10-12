import React, { Component } from 'react';
import ValesMiniGame from './ValesMiniGame'
import './App.css';
import '../node_modules/grommet-css';
import {Tabs, Tab} from 'grommet';

class App extends Component {
    constructor(){
        super();
        this.store = {vale: {scoreboard_entries: null}};
    }
    render() {
        return (
            <Tabs>
                <Tab title="Vale">
                    <ValesMiniGame parent={this}/>
                </Tab>
                <Tab title="Markus">

                </Tab>
                <Tab title="Richard">

                </Tab>
                <Tab title="Paul">

                </Tab>
            </Tabs>
        );
    }
}
export default App;
