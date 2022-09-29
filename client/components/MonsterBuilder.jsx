//import e from 'express';
import React, { Component } from 'react';
import Popup from 'reactjs-popup';
//import InfoModal from './InfoModal.jsx';

class MonsterBuilder extends Component {
    constructor() {
        super();
        this.state = {
            monsterDamage: 0,
            monsterTotalHP: 0,
            initialized: false
        }
        this.handleDamageClick = this.handleDamageClick.bind(this);
    }

    renderTextObj(obj) {
        let result = '';
        for (let el in obj) {
            result += (el + ': ' + obj[el] + ', ');
        }
        return result.slice(0, result.length - 3);
    }

    renderTextArray(arr) {
        let result = '';
        if (arr.length === 0) return 'NONE... that we know of'
        for (let el of arr) {
            if (typeof el === 'object') result += this.renderTextObj(el) + ', ';
            else result += (el + ', ')
        }
        return result.slice(0, result.length - 2);
    }

    parsingAttacks(arr) {
        let resultArr = [];
        for (let i = 0; i < arr.length; i++) {
            resultArr.push(
                <div className='attackPopup'>
                    <h5>{arr[i].name}</h5>
                    <p>{JSON.stringify(arr[i])}</p>
                    {/* <h6>{arr[i].name}</h6>
                    <p><small>{arr[i].desc}</small></p>
                    <ul>
                        <li>Attack Bonus: {`${arr[i].attack_bonus}`}</li>
                        <li>{`${JSON.stringify(arr[i])}`}</li>
                    </ul> */}
                </div>)
        }
        return resultArr;
    }

    handleDamageClick() {
        console.log('Hello from handle damage click');
        console.log(this.state);
        let prevHP = this.state.monsterTotalHP;
        let prevDamage = this.state.monsterTotalHP;
        if (prevHP > 1) {
            this.setState({
                ...this.state,
                monsterTotalHP: --prevHP,
                monsterDamage: ++prevDamage
            })
        } else if (prevHP === 1) {
            this.setState({
                ...this.state,
                monsterTotalHP: 'DEAD',
                monsterDamage: ++prevDamage
            })
        }

    }

    async componentDidMount() {
        console.log('hello from did mount');
        if (!this.state.initialized) {
            await this.setState({
                ...this.state,
                initialized: true,
                monsterTotalHP: this.props.monsterInfo.hit_points
            })
        }
        console.log(this.state);
    }

    render() {
        //console.log(this.props.monsterInfo.name);



        return (
            <article className='monster-card' style={{ backgroundColor: this.state.monsterTotalHP !== 'DEAD' ? '#fcc7aa' : '#880808' }}>
                <div className='monster header'>
                    <h4 className='monster name'>{this.props.monsterInfo.name}</h4>
                </div>
                <ul className='monsterDetailsList'>
                    <li className='monsterDetails'>Size: {this.props.monsterInfo.size}</li>
                    <li className='monsterDetails'>AC: {this.props.monsterInfo.armor_class}</li>
                    <li className='monsterDetails'>HP: {this.props.monsterInfo.hit_points}</li>
                    <li className='monsterDetails'>Speed: <small>{this.renderTextObj(this.props.monsterInfo.speed)}</small></li>
                </ul>
                <ul className='monsterStatsList'>
                    <h5 className='monsterStatsHeader'>Stats</h5>
                    <li className='monsterStats'>Strength: {this.props.monsterInfo.strength}</li>
                    <li className='monsterStats'>Dexterity: {this.props.monsterInfo.dexterity}</li>
                    <li className='monsterStats'>Constitution: {this.props.monsterInfo.constitution}</li>
                    <li className='monsterStats'>Wisdom: {this.props.monsterInfo.wisdom}</li>
                    <li className='monsterStats'>Charisma: {this.props.monsterInfo.charisma}</li>
                </ul>
                <section className='monsterFightInfo'>
                    <h5 className='monsterFightInfoHeader'>FightStats</h5>
                    <Popup
                        className='vulnerabilitiesButton'
                        trigger={open => (
                            <button className="button">Vulnerabilities</button>
                        )}
                        position="right center"
                        closeOnDocumentClick
                    >
                        <span className='popupContent'> {this.renderTextArray(this.props.monsterInfo.damage_vulnerabilities)} </span>
                    </Popup>
                    <Popup
                        className='resistancesButton'
                        trigger={open => (
                            <button className="button">Resistances</button>
                        )}
                        position="right center"
                        closeOnDocumentClick
                    >
                        <span> Popup content </span>
                    </Popup>
                    <Popup
                        className='immunitiesButton'
                        trigger={open => (
                            <button className="button">Immunities</button>
                        )}
                        position="right center"
                        closeOnDocumentClick
                    >
                        <span> Popup content </span>
                    </Popup>
                    <Popup
                        className='conditionImmuneButton'
                        trigger={open => (
                            <button className="button">Condition Immunities</button>
                        )}
                        position="right center"
                        closeOnDocumentClick
                    >
                        <span> Popup content </span>
                    </Popup>
                    <Popup
                        className='attacksButton'
                        trigger={open => (
                            <button className="button">ATTACKS!</button>
                        )}
                        position="bottom center"
                        closeOnDocumentClick
                    >
                        <span> {this.parsingAttacks(this.props.monsterInfo.actions)} </span>
                    </Popup>
                </section>
                <section className='damageTracker'>
                    <h5>Damage Tracker</h5>
                    <button className='damageButton' onClick={this.handleDamageClick}>Add Damaage</button>
                    <h5>Total HP Left :</h5>
                    <div className='damageCounter' style={{ borderStyle: 'solid', borderColor: 'black' }}>{this.state.monsterTotalHP}</div>

                </section>
            </article >
        )
    }


}








export default MonsterBuilder;