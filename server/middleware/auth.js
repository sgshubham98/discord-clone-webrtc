const jwt = require("jsonwebtoken")

const config = process.env

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
        return res.status(403).json({
            message: "Unable to authenticate user.",
            error: true
        })
    }
    try {
        token = token.replace(/^Bearer\s+/, "")
        const decoded = jwt.verify(token, config.TOKEN_KEY)
        req.user = decoded
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            error: true
        })
    }
    return next()
}

module.exports = verifyToken