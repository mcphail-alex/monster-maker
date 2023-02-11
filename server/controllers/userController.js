const userDB = require('../models/userModel.js');


const userController = {};

userController.createUser = async (req, res, next) => {
    // console.log('hello from createUser');
    // console.log(res.locals.cookieID)
    if (!req.cookies.id) {
        const newUser = new userDB({
            cookieId: res.locals.cookieID,
            userState: { set: false }
        })
        await newUser.save();
    }else{
        const newUser = new userDB({
            cookieId: req.cookies.id,
            userState: { set: false }
        })
        await newUser.save();
    }
    return next();
}

userController.saveUserState = (req, res, next) => {
    console.log('made it to the saveuser state');
    // console.log(req.cookies.id);
    userDB.updateOne({ cookieId: req.cookies.id }, { userState: req.body }, (err, res) => {
        //console.log(res.nModified);
        next();
    })
}

userController.getUserState = (req, res, next) => {
    console.log('made it to getUserState');
    const { cookieID } = req.params;
    console.log(cookieID);
    userDB.findOne({ cookieId: cookieID }, (err, userState) => {
        if (err) {
            next(err);
        }
        else res.locals.userState = userState;
        next();
    })
}

userController.deleteUserEntry = (req, res, next) => {
    // console.log('made it to delete user');
    // const newState = {
    //     fetchedMonsters: false,
    //         totalMonsterEntries: [],
    //         selectedMonsters: [],
    //         partyNumber: 0,
    //         partyLevel: 0,
    //         numberOfMonsters: 0,
    //         partyThreshold: 0,
    //         isPartySubmitted: false,
    //         monsterCR: 0,
    // }
    const {cookieID} = req.params;
    console.log(cookieID)
    userDB.findOneAndDelete({cookieId: cookieID}, (err, result) => {
        if(err){
            next(err);
        }else{ 
            res.locals.deletedEntry = result;
        }
        next();
    })
}

module.exports = userController;