require("dotenv").config()
const User = require("../modules/user")
const jwt = require("jsonwebtoken")
const createToken = (user) => {
    return jwt.sign({userID:user._id,IsAdmin:user.IsAdmin} ,process.env.SECRET, { expiresIn: "3d" } )
}
const signUp = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const user = await User.signup(email, password, username)
        res.status(200).json({user})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
    
}

const logIn = async (req, res) => {
    const {  email, password } = req.body
    try {
        const user = await User.signIn(email, password)
        const { password:pass, ...rest } = user._doc
        const token = createToken(user)
        res.status(200).cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        }).json(rest);

    } catch (err) {
        res.status(400).json({error:err.message})
    }
    
}

const signOut = (req, res) => {
   try {
     res.clearCookie('access_token').status(200).json('User has been signed out')
   } catch (error) {
    res.status(401).json({error: "Failed to SingOut"})
    }
    
}

module.exports = {signUp,logIn,signOut}