

const monsterController = {};

monsterController.getMonsters = (req, res, next) => {
    console.log('made it to the monsterController - get monsters')
    const { CR } = req.params;
    fetch(`https://www.dnd5eapi.co/api/monsters?challenge_rating=${CR}`)
        .then(data => data.json())
        .then((data) => {
            res.locals.monsters = data
            return next();
        })
        .catch((err) => {
            return next({ 'error in monsterController': err });
        });
}

monsterController.getMonsterInfo = async (req, res, next) => {
    console.log('made it to the monsterController - get info')
    // console.log(req.body);
    // console.log(typeof req.body[0]);
    res.locals.monsterDataArray = [];
    for (let i = 0; i < req.body.length; i++) {
        let data = await fetch(`https://www.dnd5eapi.co/api/monsters/${req.body[i]}`)
        data = await data.json();
        res.locals.monsterDataArray.push(data);
        //console.log(res.locals.monsterDataArray.length);
        //     res.locals.monsterDataArray.push(data);
        //     console.log(res.locals.monsterDataArray.length);

        // })
        // .catch((err) => {
        //     return next({ 'error in monsterController': err });
        // });
    }
    //console.log('out of the loop');
    //console.log(res.locals.monsterDataArray);
    return next();
}


module.exports = monsterController;