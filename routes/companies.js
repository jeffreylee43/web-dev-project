const express = require('express');
const router = express.Router();
const data = require('../data');
const companies = data.companies;

router.get('/:ticker', async (req, res) => {
    if(!req.session.user) {
        return res.status(403).render('users/notLoggedIn', {title: "Not Logged In", loggedIn: false});
    }
    try {
        const company = await companies.getCompany(req.params.ticker);
        res.render('companies/companyProfile', {
            title: 'Company Profile',
            loggedIn: true,
            company: company
        });
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = router;
