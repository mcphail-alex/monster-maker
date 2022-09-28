import React from 'react';

const MonsterDisplay = props => {
    console.log('hellow from monster display!');
    console.log(props);
    // let monsters = props.monsterArray.map(el => {
    //     return (
    //         <MonsterBuilder
    //             monster={el}
    //         />
    //     )
    // })

    return (
        <>
            <h4>RAAAR...THIS IS A TEST!</h4>
            {/* {monsters} */}
        </>
    )
}

export default MonsterDisplay;