require("dotenv").config()
const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose")
const auth = require("./routes/auth")
const product = require("./routes/product")
const user = require("./routes/user");
const app = express()
const path = require("path");


// app.use(cors({
//     origin: 'http://localhost:5173', 
//     credentials: true, 
// }));

app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use("/api/auth",auth)
app.use("/api/products",product)
app.use("/api/user", user);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
    app.listen(process.env.PORT, () => {
    console.log(`we are listening to port ${process.env.PORT} and conecting to database`)
    })
    }) .catch((err) => {
    console.log("The error from conect is:", err);
});

