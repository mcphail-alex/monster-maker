import React from 'react';
import MonsterBuilder from './MonsterBuilder.jsx';

const MonsterDisplay = props => {
    console.log('hellow from monster display!');
    const { monsterArray } = props;
    console.log(monsterArray.length);
    let monsters = [];
    for (let i = 0; i < props.monsterArray.length; i++) {
        monsters.push(<div key={`${i}`} className={`monster ${i}`}><MonsterBuilder monsterInfo={props.monsterArray[i]} /></div>);
    }
    console.log(monsters);

    return (
        <>
            <h4>RAAAR...THIS IS A TEST!</h4>
            {monsters}
        </>
    )
}

export default MonsterDisplay;