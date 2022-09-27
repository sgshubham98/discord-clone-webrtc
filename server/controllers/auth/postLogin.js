const User = require("../../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const postLogin = async (req, res) => {
    try {
        const { mail, password } = req.body

        const user = await User.findOne({ mail: mail.toLowerCase() })

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    userId: user._id,
                    mail: mail.toLowerCase()
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '24h'
                }
            )
            return res.status(200).json({
                userDetails: {
                    mail: user.mail,
                    token: token,
                    username: user.username
                },
                error: false
            })
        }
        return res.status(400).json({
            message: "Invalid credentials!",
            error: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error Occured. Please try again!",
            error: true
        })
    }
}

module.exports = postLogin