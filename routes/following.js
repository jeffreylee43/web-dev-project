const express = require('express');
const router = express.Router();
const data = require('../data');
const companies = data.companies;
const traders = data.traders;
const reviews = data.reviews;

router.get('/', async (req, res) => {
    if(!req.session.user) {
        return res.status(403).render('users/notLoggedIn', {title: "Not Logged In", loggedIn: false});
    }
    try {
        let actionItem = "" + new Date() + ": Viewed Following Tab.";
        const updateHistory = await traders.addTraderHistory(req.session.user._id, actionItem);
        const userInfo = await traders.getTraderById(req.session.user._id);
        let followingNotExists = (userInfo.followingArray.length > 0) ? false : true;
        let mostPopularStocks = (!followingNotExists) ?  await traders.getMostPopularStocks(req.session.user._id) : [];
        let commonStocksExist = (mostPopularStocks.length == 0) ? false : true;
        const allFollowing = await traders.getFollowingTraders(userInfo._id);
        res.render('users/following', {
            title: 'View Other Users',
            loggedIn: true,
            userInfo: userInfo,
            allCompanies: mostPopularStocks,
            commonStocksExist: commonStocksExist,
            followingNotExists: followingNotExists,
            allFollowing: allFollowing
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    if(!req.session.user) {
        return res.status(403).render('users/notLoggedIn', {title: "Not Logged In", loggedIn: false});
    }
    try {
        const userInfo = await traders.getTraderById(req.session.user._id);
        let followingNotExists = (userInfo.followingArray.length > 0) ? false : true;
        if (req.body.userInput){
            let errors = [];
            try {
                let visitUser = await traders.getTraderByEmail(req.body.userInput);
                let emailExists = (!visitUser) ? false : true;
                if (!emailExists){
                    errors.push("Error: Email not found.");
                }
                if (visitUser.status != "public"){
                    errors.push("Cannot View User Dashboard. The User is Private.");
                }
            } catch(e){
                errors.push(e);
            }
            let hasError = (errors.length > 0) ? true : false;
            if (errors.length > 0){
                let mostPopularStocks = (!followingNotExists) ?  await traders.getMostPopularStocks(req.session.user._id) : [];
                let commonStocksExist = (mostPopularStocks.length == 0) ? false : true;
                const allFollowing = await traders.getFollowingTraders(userInfo._id);
                res.render('users/following', {
                    title: 'View Other Users',
                    loggedIn: true,
                    userInfo: userInfo,
                    allCompanies: mostPopularStocks,
                    commonStocksExist: commonStocksExist,
                    hasError: hasError,
                    errors: errors,
                    followingNotExists: followingNotExists,
                    allFollowing: allFollowing
                });
            } else {
                res.redirect('/profile/' + req.body.userInput);
            }
        } else if (req.body.visitButton){
            let userEmail = req.body.visitButton;
            res.redirect('/profile/' + userEmail);
        } else if (req.body.addButton){
            let addInput = req.body.addButton;
            let stockTicker = addInput;
            const company = await companies.getCompany(stockTicker);
            let actionItem = "" + new Date() + ": Added company " + company.name + " to Dashboard.";
            const updateHistory = await traders.addTraderHistory(req.session.user._id, actionItem);
            const addToDashBoard = await companies.addStockDashboard(req.session.user._id, company._id);
            res.redirect('/following');
        } else {
            res.redirect('/following');
        }
    } catch (e) {
        res.status(404).json({ message: e });
    }
});

module.exports = router;
