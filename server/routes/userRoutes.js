const express = require("express");
const User = require("../models/userModel");
const bcrpyt = require("bcrypt")
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.send({
                success: false,
                message: "User already exists"
            })
        }

        const salt = await bcrpyt.genSalt(10)
        const hashPassword = await bcrpyt.hash(req.body.password, salt)
        req.body.password = hashPassword;

        const newUser = new User(req.body);
        await newUser.save()

        res.status(201).send({ 'message': 'User created Succesfully' });

    }
    catch (err) {
        res.json(err)
    }

});


router.post("/login", async (req, res) => {

    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        res.send({
            success: false,
            message: "User not found, Please Register"
        })
    }
    const validPassword = await bcrpyt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.send({
            success: false,
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ "message": "Login Succesful", "token": token });

});


router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId }).select("-password");
        res.send({
            success: true,
            message: 'user found!',
            data: user
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: err.message
        })
    }
});

module.exports = router;