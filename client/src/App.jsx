import React, { Component } from 'react';
import { render } from 'react-dom';
import './styles/styles.scss'
import Party from '../components/Party.jsx'
import MonsterDisplay from '../components/MonsterDisplay.jsx';

class App extends Component {
    constructor() {
        super();
        this.state = {
            fetchedMonsters: false,
            totalMonsterEntries: [],
            selectedMonsters: [],
            partyNumber: 0,
            partyLevel: 0,
            numberOfMonsters: 0,
            partyThreshold: 0,
            isPartySubmitted: false
        }
        //add any functions that need to be boudn here
        this.submitPartyInfo = this.submitPartyInfo.bind(this);
        this.updateFetchedMonsters = this.updateFetchedMonsters.bind(this);
    }




    submitPartyInfo(partySize, partyLevel, difficultyLevel) {
        const difficultyChart = {
            easy: 0,
            medium: 1,
            hard: 2,
            deadly: 3
        }
        const xpThreshold = {
            1: [25, 50, 75, 100],
            2: [50, 100, 150, 200],
            3: [75, 150, 225, 400],
            4: [125, 250, 375, 500],
            5: [250, 500, 750, 1100],
            6: [300, 600, 900, 1400],
            7: [350, 750, 1100, 1700],
            8: [450, 900, 1400, 2100],
            9: [550, 1100, 1600, 2400],
            10: [600, 1200, 1900, 2800],
            11: [800, 1600, 2400, 3600],
            12: [1000, 2000, 3000, 4500],
            13: [1100, 2200, 3400, 5100],
            14: [1250, 2500, 3800, 5700],
            15: [1400, 2800, 4300, 6400],
            16: [1600, 3200, 4800, 7200],
            17: [2000, 3900, 5900, 8800],
            18: [2100, 4200, 6300, 9500],
            19: [2400, 4900, 7300, 10900],
            20: [2800, 5700, 8500, 12700]
        }
        const difficultyMultiplier = difficultyChart[difficultyLevel];
        const partyThreshold = xpThreshold[partyLevel][difficultyMultiplier] * partySize;
        const newState = {
            ...this.state,
            partyNumber: partySize,
            partyLevel: partyLevel,
            numberOfMonsters: difficultyMultiplier + 2,
            partyThreshold: partyThreshold,
            isPartySubmitted: true
        }
        console.log(newState);
        return this.setState(newState);
    }

    updateFetchedMonsters(monsterEntries) {

    }

    render() {
        if (this.state.isPartySubmitted && !this.state.fetchedMonsters) {
            fetch(`/api/${this.state.partyThreshold}`, {
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(res => {
                    updateFetchedMonsters(res);
                })
                .catch(err => console.log('Monster fetch ERROR: ', err));
        }

        return (

            <div className='party-form'>
                {!this.state.isPartySubmitted && (
                    <Party
                        submitPartyInfo={this.submitPartyInfo}
                    />
                )}

                {this.state.isPartySubmitted && (
                    <MonsterDisplay
                        updateFetchedMonsters={this.updateFetchedMonsters}
                    />
                )}
            </div>

        )
    }

}

export default App;