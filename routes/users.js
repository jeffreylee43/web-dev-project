const express = require('express');
const router = express.Router();
const data = require('../data');
const companies = data.companies;
const apiKey = "bu92bcn48v6t2erin5ig";

router.get('/dashboard', async (req, res) => {
    if(!req.session.user) {
        return res.status(403).render('users/notLoggedIn', {title: "Not Logged In", loggedIn: false});
    }
    res.render('users/dashboard', { title: 'Your Dashboard', loggedIn: true});
});

//add to companies in the database

//make it go to companies/AAPL
router.post('/dashboard', async (req, res) => {
    try{
    const search = req.body.searchTicker;
    if (!req.body.searchTicker) {
        res.status(404).render("../views/users/error",{title: "Error Found", searchTerm: search})
        return;
    }
    const company = await companies.getAPICompany(search,apiKey)
    //Checking if search term is a valid ticker or not
    if(Object.keys(company).length === 0 && company.constructor === Object){
        res.status(404).render("../views/users/error",{title: "Error Found", searchTerm: search})
        console.log("no company found")
        return;
    } else{
        let company2 = await companies.addCompany(search);
    }
    res.redirect(`/companies/${search}`)
    }catch (e){
        res.status(404).render("../views/users/error",{title: "Error Found", searchTerm: search})
    }
});
module.exports = router;
