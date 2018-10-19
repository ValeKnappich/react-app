import React, { Component } from 'react';
import PaulsMiniGame from './Paul/PaulsMiniGame';
import './Paul/PaulsMiniGame.css';
import ValesMiniGame from './Vale/ValesMiniGame'
import './Vale/ValesMiniGame.css';
import MarkusMiniGame from './Markus/components/game';

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
                    <MarkusMiniGame />
                </Tab>
                <Tab title="Richard">

                </Tab>
                <Tab title="Paul">
                    <PaulsMiniGame  />
                </Tab>
            </Tabs>
        );
    }
}
export default App;