const express = require('express');
const router = express.Router();
const data = require('../data');
const companies = data.companies;

router.get('/:ticker', async (req, res) => {
    try {
        const company = await companies.getCompany(req.params.ticker);
        res.render('companies/companyProfile', {
            title: 'Company Profile',
            company: company,
        });
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = router;
