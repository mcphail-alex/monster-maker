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




module.exports = cookieController;