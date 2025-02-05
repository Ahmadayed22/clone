const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs");
const validator = require("validator")
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required : true
    },
    email : {
        type: String,
        unique: true,
        required :true
    },
    password: {
        type: String,
        required: true,
    },

    IsAdmin: {
        type: Boolean,
        default:false,
    }
}, { timestamps: true })

// SignUp logic
UserSchema.statics.signup = async function (email, password, username) {
    if (!email || !password || !username) {
        throw Error("All Fields must be Filled")
    }
    if (!validator.isEmail(email)) {
        throw Error ("Email Not valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password Not Strong")
    }
    const EmailExist = await this.findOne({ email })
    const UsernameExist = await this.findOne({ username });
    if (EmailExist) {
        throw Error("email already in use")
    }
    if (UsernameExist) {
        throw Error("UserName already in use")
    }
    
    const hash = await bcryptjs.hashSync(password,10)
    const user = await this.create({ email, password:hash, username })
    return user
}
// SignIn logic

UserSchema.statics.signIn = async function (email,password) {
    if (!email || !password) {
        throw Error("All Fields must be Filled")
    }
    const user = await this.findOne({email})
    if (!user) {
        throw Error("Incorrect email")
    }

    const match = await bcryptjs.compare(password, user.password)
    if (!match) {
        throw Error ("Incorrect password")
    }
    return user
}

UserSchema.statics.createUser = async function (email, password, username, IsAdmin) {
    if (!email || !password || !username) {
        throw Error("All Fields must be Filled");
    }
    if (!validator.isEmail(email)) {
        throw Error("Email Not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password Not Strong");
    }
    const EmailExist = await this.findOne({ email });
    const UsernameExist = await this.findOne({ username });
    if (EmailExist) {
        throw Error("Email already in use");
    }
    if (UsernameExist) {
        throw Error("Username already in use");
    }

    const hash = await bcryptjs.hash(password, 10); 
    const user = await this.create({ email, password: hash, username, IsAdmin });
    return user;
};
const User = mongoose.model("User", UserSchema);
module.exports = User