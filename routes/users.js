const express = require('express');
const router = express.Router();

router.get('/dashboard', async (req, res) => {
    res.render('users/dashboard', { title: 'Your Dashboard' });
});

module.exports = router;
