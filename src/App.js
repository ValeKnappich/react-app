import React, { Component } from 'react';
import ValesMiniGame from './Vale/ValesMiniGame'
import './Vale/App.css';
import '../node_modules/grommet-css';
import {Tabs, Tab} from 'grommet';

class App extends Component {
    constructor(){
        super();
        this.store = {vale: {scoreboard_entries: null}};
    }
    render() {
        return (
            <Tabs style={{borderBottom: '1px solid black'}} responsive={false}>
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
