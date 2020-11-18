const express = require('express');
const router = express.Router();
const data = require('../data');
const traders = data.traders;

router.get('/', async (req, res) => {
    res.render('users/register', {title: "Register", hasErrors: false, errors: []});
});

router.post('/', async (req, res) => {
    const {firstName, lastName, email, password, gender, age} = req.body;
    let errors = [];
    const parsedAge = parseInt(age);
    
    try {
        const getTrader = await traders.getTraderByEmail(email);
        // if(getTrader) {
        //     errors.push("The provided email address is already in use.");
        //     return res.status(401).render('user/register', {title: "Register", hasError: true, errors: errors});
        // }
        errors.push("The provided email address is already in use.");
        return res.status(401).render('user/register', {title: "Register", hasError: true, errors: errors});
    } catch (e) {
        const newTrader = await traders.addNewTrader(firstName, lastName, email, gender, parsedAge, password);
        res.render('users/dashboard', {title: "Your Dashboard"});
    }
    
});

module.exports = router;