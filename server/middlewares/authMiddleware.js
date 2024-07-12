const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1];
    if (token.length < 1 || token === null) {
        return res.status(401).send('Access denied. No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        req.body.userId = decoded.userId;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}       