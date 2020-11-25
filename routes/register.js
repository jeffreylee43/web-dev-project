const express = require('express');
const router = express.Router();
const data = require('../data');
const traders = data.traders;

router.get('/', async (req, res) => {
    if(req.session.user) {
        return res.redirect("users/dashboard");
    }
    res.render('users/register', {title: "Register", loggedIn: false, hasErrors: false, errors: []});
});

router.post('/', async (req, res) => {
    const {firstName, lastName, email, password, gender, age} = req.body;
    let errors = [];
    const parsedAge = parseInt(age);
    const emailForCheck = email.toLowerCase();
    
    try {
        const getTrader = await traders.getTraderByEmail(emailForCheck);
        // if(getTrader) {
        //     errors.push("The provided email address is already in use.");
        //     return res.status(401).render('user/register', {title: "Register", hasError: true, errors: errors});
        // }
        errors.push("The provided email address is already in use.");
        return res.status(401).render('users/register', {title: "Register", loggedIn: false, hasError: true, errors: errors});
    } catch (e) {
        const newTrader = await traders.addNewTrader(firstName, lastName, emailForCheck, gender, parsedAge, password);
        res.render('users/dashboard', {title: "Your Dashboard", loggedIn: true});
    }
    
});

module.exports = router;
