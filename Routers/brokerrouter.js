console.log("Broker router file loaded");

const express = require("express");
const {loginBroker} = require("../Controllers/brokerController");
const brokerauth = require("../Authentication/authMiddleware");

const router = express.Router();

router.post("/login",loginBroker);
router.get("/dashboard",brokerauth, (req, res) => {
    res.json({ message: "Welcome, Sanjay! This is your broker dashboard" });
});



module.exports = router;