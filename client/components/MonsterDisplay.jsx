import React from 'react';
import MonsterBuilder from './MonsterBuilder.jsx';

const MonsterDisplay = props => {
    console.log('hellow from monster display!');
    const { monsterArray, clearBoard } = props;
    console.log(monsterArray.length);
    let monsters = [];
    for (let i = 0; i < props.monsterArray.length; i++) {
        monsters.push(<div key={`${i}`} className={`monster ${i}`}><MonsterBuilder monsterInfo={props.monsterArray[i]} /></div>);
    }
    console.log(monsters);

    return (
        <>
            <div className='monsterGrid'>
                 {monsters}
            </div>
            <button class='clearBoard' onClick={clearBoard}>Clear this encounter</button>
        </>
    )
}

export default MonsterDisplay;