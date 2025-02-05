const User = require("../modules/user")
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const createUser = async (req, res) => {
    const { username, email, password, IsAdmin } = req.body
    console.log(req.body)
    try {
        const user = await User.createUser(email, password, username,IsAdmin)
        res.status(200).json({user})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}
const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'You are not allowed to update this user' });
    }

    const { username, email, password } = req.body;

    // Correct password length check
    if (password && password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const update = { username, email };

    if (password) {
        const hash = bcryptjs.hashSync(password, 10);
        update.password = hash;
    }

    try {
        const user = await User.findByIdAndUpdate(id, update, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { password: pwd, ...rest } = user._doc; // Remove password from response
        res.status(200).json(rest); // Return user data without the password

    } catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
};
// In updateUser controller
const updateUserByAdmin = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'You are not allowed to update this user' });
    }

    const { username, email, password, IsAdmin } = req.body;

    if (password && password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const update = { username, email, IsAdmin };

    if (password) {
        const hash = bcryptjs.hashSync(password, 10);
        update.password = hash;
    }

    try {
        const user = await User.findByIdAndUpdate(id, update, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { password: pwd, ...rest } = user._doc;
        res.status(200).json(rest);

    } catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
};



const deleteUser = async (req, res) => {
    const { id } = req.params;
 
    const userId = id.split(":")[1];
    console.log(req.params.id)
    console.log(userId)

    if (!userId) {
        return res.status(400).json({ error: `Invalid user ID format ${id}` });
    }

    if (!req.user.IsAdmin) {
       
        return res.status(403).json({ error: "You are not allowed to delete this account" });
    }

    try {
        await User.findByIdAndDelete(id.slice(1));
        return res.status(200).json("User has been deleted");
    } catch (err) {
        // console.error(error);
        return res.status(500).json({ error: `Failed to delete the account ${err}` });
    }
};


const getusers = async (req, res) => {
    
    if (!req.user.IsAdmin) {
   
        return res.status(401).json({ error: "You are not authorized to get users" });
    }
    try {
        const startIndex = parseInt(req.query.startIndex , 10) || 0
        const limit = parseInt(req.query.limit, 10) || 9
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const users = await User.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.searchTerm) && {
                $or: [
                { username: { $regex: req.query.searchTerm, $options: "i" } },
                { email: { $regex: req.query.searchTerm, $options: "i" } }
            ]}

        }).skip(startIndex).limit(limit).sort({ createdAt: sortDirection });
        const totalUsers = await User.countDocuments();
        const userWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthUsers = await User.countDocuments({
            createdAt:{$gte:oneMonthAgo}
        })
        res.status(200).json({users:userWithoutPassword,totalUsers,lastMonthUsers});
    } catch (err) {
        res.status(500).json({error: `Failed to get users ${err}`})
    }

}

const getUser = async (req, res) => {
    console.log(req.params.userId.slice(1))
    const {userid} = req.params.userId
    try {
        const user = await User.findById(req.params.userId.slice(1))
        // console.log(user)
        if (!user) {
        return res.status(500).json(`User Not Found`)
        }
        const { password, ...rest } = user._doc;
          res.status(200).json(rest);
    } catch (err) {
        res.status(500).json({error: `Failed to get user ${err}`})
    }
}



module.exports = {
    updateUser, deleteUser, getusers, getUser, createUser, updateUserByAdmin,
};