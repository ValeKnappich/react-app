import React, { Component } from 'react';
import PaulsMiniGame from './Paul/PaulsMiniGame';
import './Paul/PaulsMiniGame.css';
import ValesMiniGame from './Vale/ValesMiniGame'
import './Vale/ValesMiniGame.css';
import MarkusMiniGame from './Markus/components/game';

import '../node_modules/grommet-css';
import {Tabs, Tab} from 'grommet';
import RichardsMiniGame from './Richard/RichardsMiniGame';

class App extends Component {
    constructor(){
        super();
        this.store = {vale: {scoreboard_entries: null}};
    }
    render() {
        return (
            <Tabs id="Tabbar" responsive={false} activeIndex={2}>
                <Tab title="Vale">
                    <ValesMiniGame parent={this}/>
                </Tab>
                <Tab title="Markus">
                    <MarkusMiniGame />
                </Tab>
                <Tab title="Richard">
                    <RichardsMiniGame />
                </Tab>
                <Tab title="Paul">
                    <PaulsMiniGame  />
                </Tab>
            </Tabs>
        );
    }
}
export default App;
