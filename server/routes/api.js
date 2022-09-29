const app = require('../server');
const express = require('express');
const router = express.Router();
const monsterController = require('../controllers/monsterController.js');
const cookieController = require('../controllers/cookieController.js');
const userController = require('../controllers/userController.js');


router.get('/getUserState/:cookieID',
    userController.getUserState,
    (req, res) => {
        return res.status(200).send(res.locals.userState);
    }
)

router.get('/:CR',
    cookieController.setCookie,
    userController.createUser,
    monsterController.getMonsters,
    (req, res) => {
        //console.log('made it to the router!!');
        // console.log(req.params);
        return res.status(200).json(res.locals.monsters);
    })


router.post('/moreInfo',
    monsterController.getMonsterInfo,
    (req, res) => {
        //console.log('made it to the router');
        return res.status(200).send(res.locals.monsterDataArray);
    })

router.post('/saveUserState',
    userController.saveUserState,
    (req, res) => {
        //console.log('made it to the router');
        return res.status(200).send(res.locals.monsterDataArray);
    })



module.exports = router;