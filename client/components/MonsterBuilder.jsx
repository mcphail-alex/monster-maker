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
            initialized: false,

        }
        this.handleDamageClick = this.handleDamageClick.bind(this);
    }

    renderTextObj(obj) {
        let result = '';
        for (let el in obj) {
            if(Array.isArray(obj[el])) result += el + ': ' + this.renderTextArray(obj[el])
            else if(typeof obj[el] === 'object') result += this.renderTextObj(el) + ',\n'
            result += (el + ': ' + obj[el] + ",\n");
        }
        return result.slice(0, result.length - 3);
    }

    renderTextArray(arr) {
        let result = '';
        if (arr.length === 0) return 'NONE... that we know of'
        for (let el of arr) {
            if(Array.isArray(el)) result += this.renderTextArray(el) + ',\n';
            else if (typeof el === 'object') result += this.renderTextObj(el) + ',\n';
            else result += (el + ',\n')
        }
        return result.slice(0, result.length - 2);
    }

    renderConditionImmunities(arr){
        let result = '';
        if (arr.length === 0) return 'NONE... that we know of';
        for (let el of arr) {
            result += el.index + ", ";
        }
        return result.slice(0, result.length - 2);
    }

    parsingAttacks(arr) {
        let resultArr = [];
        const link = this.createLink(this.props.monsterInfo.name)
        for (let i = 0; i < arr.length; i++) {
            const prettied = JSON.stringify(arr[i], null, 4)
            
            resultArr.push(
                <div className='attackPopup'>
                    <h5>{arr[i].name}</h5>
                    <p>{arr[i].desc}</p>
                    
                    {/* <div>{this.renderTextObj(arr[i])}</div> */}
                    {/* <h6>{arr[i].name}</h6>
                    <p><small>{arr[i].desc}</small></p>
                    <ul>
                        <li>Attack Bonus: {`${arr[i].attack_bonus}`}</li>
                        <li>{`${JSON.stringify(arr[i])}`}</li>
                    </ul> */}
                </div>)
        }
        resultArr.push(<a href={`${link}`} target='_blank'>Click for more details!</a>);
        return resultArr;
    }

    createLink(str){
        return 'https://roll20.net/compendium/dnd5e/' + str.replace(' ', '%20') + '#content';   //Swarm%20of%20Centipedes#content'
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
        console.log('hello from MONSTER BUILDER')
        console.log(this.props)
        //console.log(this.props.monsterInfo.name);



        return (

            <article className='monster-card' style={{ backgroundColor: this.state.monsterTotalHP !== 'DEAD' ? '#c8c4bf' : '#880808' }}>

                <div className='monster header'>
                    <h4 className='monster name'>{this.props.monsterInfo.name}</h4>
                </div>
                <ul className='monsterDetailsList'>
                    <li className='monsterDetails'>Size: {this.props.monsterInfo.size}</li> 
                    {/* <li className='monsterDetails'>AC: {this.props.monsterInfo.armor_class}</li> */}
                    <li className='monsterDetails'>HP: {this.props.monsterInfo.hit_points}</li> 
                    <li className='monsterDetails'>Speed: <small>{this.renderTextObj(this.props.monsterInfo.speed)}</small></li>
                    <li className='monsterStats'>Strength: {this.props.monsterInfo.strength}</li>
                    <li className='monsterStats'>Dexterity: {this.props.monsterInfo.dexterity}</li>
                    <li className='monsterStats'>Constitution: {this.props.monsterInfo.constitution}</li>
                    <li className='monsterStats'>Wisdom: {this.props.monsterInfo.wisdom}</li>
                    <li className='monsterStats'>Charisma: {this.props.monsterInfo.charisma}</li>
                </ul>
                <section className='monsterFightInfo' style={{ backgroundColor: this.state.monsterTotalHP !== 'DEAD' ? '#c8c4bf' : '#880808' }}>
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
                        <span className='popupContent'> {this.renderTextArray(this.props.monsterInfo.damage_resistances)} </span>
                    </Popup>
                    <Popup
                        className='immunitiesButton'
                        trigger={open => (
                            <button className="button">Immunities</button>
                        )}
                        position="right center"
                        closeOnDocumentClick
                    >
                        <span className='popupContent'>  {this.renderTextArray(this.props.monsterInfo.damage_immunities)}  </span>
                    </Popup>
                    <Popup
                        className='conditionImmuneButton'
                        trigger={open => (
                            <button className="button">Condition Immunities</button>
                        )}
                        position="right center"
                        closeOnDocumentClick
                    >
                        <span className='popupContent'> {this.renderConditionImmunities(this.props.monsterInfo.condition_immunities)} </span>
                    </Popup>
                    <Popup
                        className='attacksButton'
                        trigger={open => (
                            <button className="button">ATTACKS!</button>
                        )}
                        position="bottom center"
                        closeOnDocumentClick
                    >
                        <span className='popupContent'> {this.parsingAttacks(this.props.monsterInfo.actions)} </span>
                    </Popup>
                </section>
                <section className='damageTracker'>
                    <h5>Damage Tracker</h5>
                    <button className='damageButton' onClick={this.handleDamageClick}>Take Damaage</button>
                    <h5>Total HP Left :</h5>
                    <div className='damageCounter' style={{ borderStyle: 'solid', borderColor: 'black' }}>{this.state.monsterTotalHP}</div>

                </section>
            </article >
        )
    }


}








export default MonsterBuilder;