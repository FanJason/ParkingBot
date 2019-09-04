import jwt  from 'jsonwebtoken';

module.exports = (req, res, next) => {
    try {
        console.log(req.headers)
        let token = req.headers['x-authentication-token'];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.decoded = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Authentication Failed"
        });
    }
}