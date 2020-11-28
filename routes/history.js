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
        let actionItem = "" + new Date() + ": Viewed User History.";
        const updateHistory = await traders.addTraderHistory(req.session.user._id, actionItem);
        const userInfo = await traders.getTraderById(req.session.user._id);
        res.render('users/history', {
            title: 'User History',
            loggedIn: true,
            userInfo: userInfo
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/');

module.exports = router;
