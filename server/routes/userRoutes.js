const express = require("express");
const User = require("../models/userModel");
const bcrpyt = require("bcrypt")

const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        const userExists = await User.findOne({email : req.body.email})
        if(userExists){
            return res.send({
                success : false,
                message : "User already exists"
            })
        }

        const salt = await bcrpyt.genSalt(10)
        const hashPassword = await bcrpyt.hash(req.body.password, salt)
        req.body.password = hashPassword;

        const newUser = new User(req.body);
        await newUser.save()
        
        res.status(201).json('User created Succesfully');

    }
    catch(err){
        res.json(err)
    }

});


module.exports = router;