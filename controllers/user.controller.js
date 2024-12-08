const userModel = require('../models/users.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blackliskToken.model');



module.exports.registerUser = async (req, res, next) => {
    try {
        // Validate the request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body);

        const { fullname, email, password } = req.body;

        // Check if fullname is an object or a string
        const firstname = fullname.firstname || ""; // Ensure this matches the client-side format
        const lastname = fullname.lastname || "";

        // Hash the password
        const hashedPassword = await userModel.hashPassword(password);

        // Create the user
        const user = await userService.createUser({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        // Generate an auth token
        const token = user.generateAuthToken();

        // Send response
        res.status(201).json({ token, user });
    } catch (error) {
        // Handle unexpected errors
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


module.exports.loginUser = async (req,res,next)=>{
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({error: 'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({error: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);


    res.status(200).json({token,user});
};

module.exports.getUserProfile = async (req, res, next) => {

    res.status(200).json(req.user);

}

module.exports.logoutUser = async (req,res,next)=>{
    res.clearCookie('token');

    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    await blacklistTokenModel.create({token});

    res.status(200).json({message: 'Logged out successfully'});
}