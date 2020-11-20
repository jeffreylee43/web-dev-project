const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('users/login', { title: 'Login' });
});

module.exports = router;
