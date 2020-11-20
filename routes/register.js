const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('users/register', { title: 'Register' });
});

module.exports = router;
