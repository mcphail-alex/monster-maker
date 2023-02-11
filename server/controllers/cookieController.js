const cookieController = {};

cookieController.setCookie = (req, res, next) => {
    // write code here
    console.log('hello from set cookie');
    if (!req.cookies.id) {
        const secretNum = Math.floor(Math.random() * 100000);
        res.cookie('id', secretNum, { httpOnly: false });
        res.locals.cookieID = `${secretNum}`;
    }
    next();
}

cookieController.deleteCookie = (req, res, next) => {
    console.log('hello from delete cookie');
    console.log(req.cookies);
    res.clearCookie('id');
    next();
}




module.exports = cookieController;