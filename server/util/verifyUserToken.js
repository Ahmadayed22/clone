const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
        console.error("Token verification error:", err); 
        return res.status(401).json({ error: "Unauthorized or Invalid Token", details: err.message });
        }
        req.user = user;
        
    next();
});

};

module.exports = verifyToken;