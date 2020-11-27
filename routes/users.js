const express = require('express');
const router = express.Router();

router.get('/dashboard', async (req, res) => {
    if(!req.session.user) {
        return res.status(403).render('users/notLoggedIn', {title: "Not Logged In", loggedIn: false});
    }
    res.render('users/dashboard', { title: 'Your Dashboard', loggedIn: true});
});

module.exports = router;
