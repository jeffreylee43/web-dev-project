const express = require('express');
const router = express.Router();

router.get('/login', async (req, res) => {
    res.render('users/login', { title: "Login"});
});

router.get('/register', async (req, res) => {
    res.render('users/register', {title: "Register"});
});

router.get('/dashboard', async (req, res) => {
    res.render('users/dashboard', {title: "Your Dashboard"});
});

module.exports = router;