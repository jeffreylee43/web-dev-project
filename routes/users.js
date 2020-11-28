const express = require('express');
const router = express.Router();
const data = require('../data');
const traders = data.traders;

router.get('/dashboard', async (req, res) => {
    if(!req.session.user) {
        return res.status(403).render('users/notLoggedIn', {title: "Not Logged In", loggedIn: false});
    }
    let actionItem = "" + new Date() + ": Viewed Dashboard.";
    const updateHistory = await traders.addTraderHistory(req.session.user._id, actionItem);
    res.render('users/dashboard', { title: 'Your Dashboard', loggedIn: true});
});

module.exports = router;
