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

    componentDidUpdate(prevProps, prevState) {
        console.log('component DID update');
        if (this.state !== prevState) {
            try {
                fetch(`/api/saveUserState/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...this.state })
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log('updated state on db');
                    })
            }
            catch (err) { (err => console.log('db state update error: ', err)); }
        }
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
        console.log(monsterEntries.results[1].name);
        let monsterNames = [];
        for (let i = 0; i < selections.length; i++) {
            monsterNames.push(monsterEntries.results[selections[i]].index);//`/api/moreInfo/${monsterNames}`
        }
        console.log(monsterNames);
        try {
            fetch(`/api/moreInfo/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(monsterNames)
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    return this.setState({
                        ...this.state,
                        fetchedMonsters: true,
                        selectedMonsters: [...res],
                        totalMonsterEntries: [...monsterEntries.results],
                    })
                });
        }
        catch { (err => console.log('Monster fetch ERROR: ', err)); }
    }
    // console.log(selections);
    // const monsterArray = []

    // selections.forEach(num => {
    //     console.log('inside forEach function');
    //     fetch(`/api/moreInfo/${monsterEntries.results[num].index}`, {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },
    //     })
    //         .then((res) => res.json())
    //         .then(res => {
    //             monsterArray.push(res)
    //         })
    //     //     .catch { (err => console.log('Monster fetch ERROR: ', err)); }
    //     // console.log(monsterArray);
    // })
    // console.log('done with forEach');
    // console.log('monster array length: ', monsterArray.length);

    // const newState = {
    //     ...this.state,
    //     fetchedMonsters: true,
    //     selectedMonsters: monsterArray,
    //     totalMonsterEntries: [...monsterEntries.results],
    // }
    // console.log('newstate: ', newState);
    // return this.setState(newState);

    checkForCookie() {
        console.log('hello from checkForCookie');
        let cookieArr = document.cookie.split(';');
        console.log(cookieArr);
        for (const item of cookieArr) {
            if (item.startsWith('id=')) return item.substring(3);
        }
        return null;
    }

    render() {
        //check to see if nothing has been submitted
        //this will tell is a brand new load and we should check for
        //a cookie ID
        if (!this.state.isPartySubmitted && !this.state.fetchedMonsters) {
            let cookieID = this.checkForCookie();
            //console.log(cookieID);
            try {
                fetch(`/api/getUserState/${cookieID}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(res => res.json())
                    .then(res => {
                        this.setState({
                            ...res.userState
                        })
                    });
            }
            catch { (err => console.log('UserState fetch ERROR: ', err)); }
        } else if (this.state.isPartySubmitted && !this.state.fetchedMonsters) {
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
        //console.log(this.state);
        return (

            <div className='party-form' >
                {!this.state.isPartySubmitted && (
                    <Party
                        submitPartyInfo={this.submitPartyInfo}
                    />
                )}

                {this.state.fetchedMonsters && (

                    < MonsterDisplay
                        monsterArray={this.state.selectedMonsters}
                    />
                )
                }
            </div >

        )
    }

}

export default App;