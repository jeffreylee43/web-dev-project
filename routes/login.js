const express = require('express');
const router = express.Router();
const data = require('../data');
const traders = data.traders;
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
    if(req.session.user) {
        return res.redirect("users/dashboard");
    }
    res.render('users/login', { title: "Login", loggedIn: false, hasError: false, errors: []});
});

router.post('/', async (req, res) => {
    const {email, password} = req.body;
    let errors = [];

    const allTraders = await traders.getAllTraders();
    for(let trader of allTraders) {
        if(trader.email === email) {
            let passwordMatch = await bcrypt.compare(password, trader.hashPassword);
            if(passwordMatch) {
                req.session.user = {_id: trader._id, firstName: trader.firstName, lastName: trader.lastName, email: trader.email, gender: trader.gender, age: trader.age, stockArray: trader.stockArray, reviewArray: trader.reviewArray};
                return res.redirect('/users/dashboard');
            } else {
                errors.push('You did not provide a valid password');
                return res.status(401).render('users/login', {title: "Login", loggedIn: false, hasError: true, errors: errors});
            }
        }
    }
    errors.push('You did not provide a valid username');
    res.status(401).render('users/login', {title: "Login", loggedIn: false, hasError: true, errors: errors});
});

module.exports = router;
