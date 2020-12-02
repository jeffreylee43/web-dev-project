const express = require('express');
const router = express.Router();
const data = require('../data');
const companies = data.companies;
const apiKey = "bu92bcn48v6t2erin5ig";
const traders = data.traders;

router.get('/dashboard', async (req, res) => {
    if(!req.session.user) {
        return res.status(403).render('users/notLoggedIn', {title: "Not Logged In", loggedIn: false});
    }
    let actionItem = "" + new Date() + ": Viewed Dashboard.";
    const updateHistory = await traders.addTraderHistory(req.session.user._id, actionItem);
    const traderCompanies = await traders.getTraderCompanies(req.session.user._id);
    res.render('users/dashboard', { 
        title: 'Your Dashboard', 
        loggedIn: true,
        traderCompanies: traderCompanies
    });
});

//add to companies in the database

//make it go to companies/AAPL
router.post('/dashboard', async (req, res) => {
    try{
        if (req.body.searchTicker){
            const search = (req.body.searchTicker).toUpperCase();
            if (!req.body.searchTicker) {
                res.status(404).render("../views/users/error",{title: "Error Found", searchTerm: search})
                return;
            }
            const company = await companies.getAPICompany(search,apiKey)
            //Checking if search term is a valid ticker or not
            if(Object.keys(company).length === 0 && company.constructor === Object){
                res.status(404).render("../views/users/error",{title: "Error Found", searchTerm: search})
                return;
            } else {
                const companyExists = await companies.getCompany(company.ticker);
                if (!companyExists){
                    let company2 = await companies.addCompany(search);
                    res.redirect(`/companies/${search}`);
                } else {
                    res.redirect(`/companies/${search}`);
                }
            }
        } else if (req.body.showSug) {
            const allSuggestions = await traders.getSuggestions(req.session.user._id);
            let noSuggestions = false;
            if(allSuggestions.length === 0) {
                noSuggestions = true;
            }
            const traderCompanies = await traders.getTraderCompanies(req.session.user._id);
            res.render('users/dashboard', {
                title: 'List of Stocks',
                loggedIn: true,
                allCompanies: allSuggestions,
                sugRequest: true,
                noSuggestions: noSuggestions,
                traderCompanies: traderCompanies
            });
        } else if (req.body.addButton) {
            let addInput = req.body.addButton;
            let stockTicker = addInput[0];
            const company = await companies.getCompany(stockTicker);
            let actionItem = "Added company " + company.name + " to Dashboard.";
            const updateHistory = await traders.addTraderHistory(req.session.user._id, actionItem);
            const addToDashBoard = await companies.addStockDashboard(req.session.user._id, company._id);
            res.redirect('/users/dashboard');
        } else if (req.body.removeButton) {
            let removeInput = req.body.removeButton;
            let stockTicker = removeInput[0];
            const company = await companies.getCompany(stockTicker);
            let actionItem = "Removed company " + company.name + " from Dashboard.";
            const updateHistory = await traders.addTraderHistory(req.session.user._id, actionItem);
            const removeFromDashboard = await traders.removeTraderStock(req.session.user._id, stockTicker);
            res.redirect('/users/dashboard');
        } else {
            res.redirect('/users/dashboard');
        }
    
    }catch (e){
        res.status(404).render("../views/users/error",{title: "Error Found", searchTerm: "search"})
    }
});
module.exports = router;
