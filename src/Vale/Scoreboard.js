import React, {Component} from "react";
import {Table, TableRow, TableHeader} from 'grommet';
import './ValesMiniGame.css';

/*Contains ControlPanel including the following Classes*/
/*  -Scoreboard                                        */
/*Externals:     Table by grommet                       */
/*Component locally saving Highscores including a name and the corresponding score */


export default class Scoreboard extends Component{
    constructor(){
        super();
        this.state = {entries: []};
        this.addEntry = this.addEntry.bind(this);
        this.sort = this.sort.bind(this);
        this.addHtml = this.addHtml.bind(this);
        this.addDummies = this.addDummies.bind(this);
    }
    render(){
        let entries = []; //local array for render function
        for(let i=0; i<this.state.entries.length; i++){
            entries[i] = this.addHtml(this.state.entries[i],i); //entries including html tags
        }
        return(
            <div className="Scoreboard">
                <p className="headline">Highscores</p>
                <Table responsive={false}>
                    <TableHeader onSort={this.sort} labels={['Name','Score']} sortAscending={false}/>
                    <tbody>
                    {entries}
                    </tbody>
                </Table>
                {/*<input type="button" onClick={this.addDummies} value="Insert dummies"/>*/}
            </div>
        );
    }
    addDummies(){       //Testing function
        let random = Math.floor(Math.random()*20);
        this.addEntry({name: "P1", score: random});
        this.addEntry({name: "P2", score: 2*random});
        this.addEntry({name: "P3", score: 3*random});
    }
    addHtml(entry, key){
        return <TableRow key={key}><td>{entry.name}</td><td>{entry.score}</td></TableRow>;
    }
    addEntry(entry){
        let tmp_entries = this.state.entries == null ? [] : this.state.entries;
        tmp_entries.push({name: entry.name, score: entry.score});
        this.sort();
        this.setState({entries: tmp_entries});
    }
    sort(){
        let tmp_entries = this.state.entries == null ? [] : this.state.entries;
        tmp_entries.sort(this.entryComparator);
        this.setState({entries: tmp_entries});
    }
    entryComparator(entry1, entry2){        //Deciding algorithm for sort
        if(entry1.score > entry2.score)return -1;
        else if(entry1.score < entry2.score)return 1;
        else return 0;
    }
}