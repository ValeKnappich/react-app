import React, { Component } from 'react';
import ValesMiniGame from './ValesMiniGame'
import './App.css';
import '../node_modules/grommet-css';
import {Tabs, Tab} from 'grommet';

class App extends Component {
    render() {
        return (
            <Tabs>
                <Tab title="Vale">
                    <ValesMiniGame/>
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
