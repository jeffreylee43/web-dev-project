const express = require('express');
const router = express.Router();
const data = require('../data');
const traders = data.traders;

router.get('/', async (req, res) => {
    if(req.session.user) {
        return res.redirect("/users/dashboard");
    }
    res.render('users/register', {title: "Register", loggedIn: false, hasErrors: false, errors: []});
});

router.post('/', async (req, res) => {
    const {firstName, lastName, email, password, gender, age} = req.body;
    let errors = [];
    const parsedAge = parseInt(age);
    const emailForCheck = email.toLowerCase();

    if(!firstName || firstName === "" || firstName.trim() === "") {
        errors.push("You did not provide your first name");
    }
    if(!lastName || lastName === "" || lastName.trim() === "") {
        errors.push("You did not provide your last name");
    }
    if(!email || email === "" || email.trim() === "") {
        errors.push("You did not provide your email address");
    }
    if(!password || password === "" || password.trim() === "") {
        errors.push("You did not provide your password");
    }
    if(!gender || gender === "" || gender.trim() === "") {
        errors.push("You did not provide your gender");
    }
    if(!age || age === "" || age.trim() === "" || age <= 0) {
        errors.push("You did not provide a valid age. The age must be greater than 0.");
    }
    if(errors.length !== 0) {
        return res.status(401).render('users/register', {title: "Register", loggedIn: false, hasError: true, errors: errors});
    }
    
    try {
        const getTrader = await traders.getTraderByEmail(emailForCheck);
        errors.push("The provided email address is already in use.");
        return res.status(401).render('users/register', {title: "Register", loggedIn: false, hasError: true, errors: errors});
    } catch (e) {
        const newTrader = await traders.addNewTrader(firstName, lastName, emailForCheck, gender, parsedAge, password);
        req.session.user = {_id: newTrader._id, firstName: newTrader.firstName, lastName: newTrader.lastName, email: emailForCheck, gender: newTrader.gender, age: newTrader.age, stockArray: newTrader.stockArray, reviewArray: newTrader.reviewArray};
        res.redirect('/users/dashboard');
    }
    
});

module.exports = router;
