const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

router.post("/register", async (req, res) => {
    res.json("user created");
});

router.post("/login", async (req, res) => {

});


module.exports = router;