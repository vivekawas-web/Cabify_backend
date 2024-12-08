const userModel = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser  = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await userModel.findOne({token: token});

    if(isBlacklisted){
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTCODE);
        const user = await userModel.findById(decoded._id); // Use decoded._id instead of decoded.id
        if (!user) {
            return res.status(404).json({ message: "User  not found" });
        }
        req.user = user;
        return next();
    } catch (error) { // Include error parameter here
        console.error("Token verification error:", error);  // Log error details
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
}