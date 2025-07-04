const jwt = require('jsonwebtoken');
const secretKey = 'Marvellous:RestaurantInfo'; 

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(401).json({ message: 'Token missing' });

    const token = authHeader.split(' ')[1]; 

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token invalid' });
        req.user = user;
        next();
    });
}

module.exports = authMiddleware;
