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

<<<<<<< HEAD

router.post('/dashboard', async (req, res) => {
    try{
    const search = req.body.searchTicker;
    if (!req.body.searchTicker) {
        res.status(404).render("../views/users/error",{title: "Error Found", searchTerm: search})
        return;
    }
    const company = await companies.getAPICompany(search,apiKey)
    if(!company){
        res.status(404).render("../views/users/error",{title: "Error Found", searchTerm: search})
    } 
    console.log(company)
    res.render('companies/companyProfile', { title: "Company Profile", company: company});
    }catch (e){
        res.status(404)
    }
});
module.exports = router;
=======
module.exports = router;
>>>>>>> 0f883d6dfa29444430f2b61e855e0fa32e09f9a4
