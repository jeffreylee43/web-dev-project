const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    req.session.destroy();
    res.render('users/logout', {title: "Logout", loggedIn: false});
});

module.exports = router;