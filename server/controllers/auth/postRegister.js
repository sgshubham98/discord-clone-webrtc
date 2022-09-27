const User = require("../../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const postRegister = async (req, res) => {
    try {
        const { mail, username, password } = req.body

        const userExists = await User.exists({ mail: mail.toLowerCase() })

        if (userExists) {
            return res.status(409).json({
                message: "Email already in user!",
                error: true
            })
        }
        const encryptedPassword = await bcrypt.hash(password, 16)
        const user = await User.create({
            username,
            mail: mail.toLowerCase(),
            password: encryptedPassword
        })

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

        return res.status(201).json({
            userDetails: {
                mail: user.mail,
                token: token,
                username: user.username
            },
            error: false
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error Occured. Please try again!",
            error: true
        })
    }
}

module.exports = postRegister