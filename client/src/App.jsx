import React, { Component } from 'react';
import { render } from 'react-dom';
import './styles/styles.scss'
import Party from '../components/Party.jsx'
import MonsterDisplay from '../components/MonsterDisplay.jsx';
import Tables from '../components/Tables';



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
            isPartySubmitted: false,
            monsterCR: 0,
        }
        //add any functions that need to be boudn here
        this.submitPartyInfo = this.submitPartyInfo.bind(this);
        this.updateFetchedMonsters = this.updateFetchedMonsters.bind(this);
    }

    determineMonsterCR(numberOfM, partyThreshold) {
        const avgMonsterXP = (partyThreshold / Tables.monsterModifier[numberOfM]) / numberOfM;
        const arrOfXP = Object.keys(Tables.xpToCR);
        let avgMonsterCR;
        if (avgMonsterXP <= 0) avgMonsterCR = 0;
        else {
            for (let i = 0; i < arrOfXP.length; i++) {
                if (arrOfXP[i] > avgMonsterXP) {
                    avgMonsterCR = Tables.xpToCR[arrOfXP[i - 1]];
                    break;
                }
            }
        }
        return avgMonsterCR;

    }


    submitPartyInfo(partySize, partyLevel, difficultyLevel) {
        console.log(Tables.difficultyChart)
        const difficultyMultiplier = Tables.difficultyChart[difficultyLevel];
        const partyThreshold = Tables.xpThreshold[partyLevel][difficultyMultiplier] * partySize;
        const numberOfMonsters = difficultyMultiplier + 2;
        const monsterCR = this.determineMonsterCR(numberOfMonsters, partyThreshold);
        const newState = {
            ...this.state,
            partyNumber: partySize,
            partyLevel: partyLevel,
            numberOfMonsters: numberOfMonsters,
            partyThreshold: partyThreshold,
            isPartySubmitted: true,
            monsterCR: monsterCR
        }
        console.log(newState);
        return this.setState(newState);
    }

    async updateFetchedMonsters(monsterEntries) {
        console.log("HUZZAH" + monsterEntries.results.length);
        let numberOfMonsters = this.state.numberOfMonsters;
        let selections = [];
        //console.log(numberOfMonsters);
        if (monsterEntries.results.length > numberOfMonsters) {
            for (let i = 0; i < numberOfMonsters; i++) {
                let randomNum = Math.floor(Math.random() * monsterEntries.results.length);
                if (selections.indexOf(randomNum) > -1) {
                    while (selections.indexOf(randomNum) >= 0) {
                        randomNum = Math.floor(Math.random() * monsterEntries.results.length);
                    }
                }
                selections.push(randomNum);
            }
        } else if (monsterEntries.results.length === numberOfMonsters) {
            for (let i = 0; i < numberOfMonsters; i++) {
                selections.push(i);
            }
        } else if (monsterEntries.results.length < numberOfMonsters) {
            let count = 0;
            for (let i = 0; i < numberOfMonsters; i++) {
                if (count < monsterEntries.results.length) selections.push(++count);
                if (count >= monsterEntries.results.length) count = 0;
            }
        }
        console.log(selections);
        const monsterArray = []
        await selections.forEach(num => {
            console.log('inside map function');
            try {
                fetch(`/api/moreInfo/${monsterEntries.results[num].index}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(res => res.json())
                    .then(res => {
                        //console.log(res);
                        monsterArray.push(res);
                        // console.log(monsterArray);
                    });
            }
            catch { (err => console.log('Monster fetch ERROR: ', err)); }

        })
        return this.setState({
            ...this.state,
            fetchedMonsters: true,
            totalMonsterEntries: [...monsterEntries.results],
            selectedMonsters: [...monsterArray],
        })

    }






    render() {
        if (this.state.isPartySubmitted && !this.state.fetchedMonsters) {
            try {
                fetch(`/api/${this.state.monsterCR}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        this.updateFetchedMonsters(res)
                    });
            }
            catch { (err => console.log('Monster fetch ERROR: ', err)); }
        }

        return (

            <div className='party-form' >
                {!this.state.isPartySubmitted && (
                    <Party
                        submitPartyInfo={this.submitPartyInfo}
                    />
                )}

                {
                    this.state.fetchedMonsters && (
                        <MonsterDisplay
                            monsterArray={this.selectedMonsters}
                        />
                    )
                }
            </div >

        )
    }

}

export default App;