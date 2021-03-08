const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedUser = jwt.verify(token, process.env.JWT_KEY);
        req.userData = {id: decodedUser.id, name: decodedUser.name}
        next();
    } catch (error) {
        res.status(401).json({message: 'AuthError'})
    }
}