// const express = require("express");
// const {CreateProduct,getProduct,deleteProduct} = require("../controller/product");
// const verifyToken = require("../util/verifyUserToken");

// const router = express.Router();

// router.post("/createproduct", CreateProduct)
// router.get("/getproduct" ,getProduct)
// router.delete('/deletProduct/:productId/:userId', verifyToken, deleteProduct)


// module.exports = router;
const express = require("express");
const multer = require("multer");
const path = require("path");
const { CreateProduct, getProduct, deleteProduct } = require("../controller/product");
const verifyToken = require("../util/verifyUserToken");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/"); // Save images in public/uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });

// Modify create product route to handle image upload
router.post("/createproduct", upload.single("image"), CreateProduct);
router.get("/getproduct", getProduct);
router.delete("/deletProduct/:productId/:userId", verifyToken, deleteProduct);

module.exports = router;
