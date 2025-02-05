const express = require("express");
const { updateUser, deleteUser, getusers, getUser, createUser, updateUserByAdmin,
    } = require("../controller/user");
const verifyToken = require("../util/verifyUserToken");

const router = express.Router();

router.post('/createUser',verifyToken,createUser)
router.put('/update/:id',verifyToken, updateUser);
router.put('/updateByAdmin/:id',verifyToken, updateUserByAdmin);

router.delete("/delete/:id", verifyToken,deleteUser)

router.get('/getusers', verifyToken, getusers)

router.get('/:userId', getUser)
router.get('/sear',verifyToken);

module.exports = router;