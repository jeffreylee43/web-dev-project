const express = require('express');
const router = express.Router();
const data = require('../data');
const companies = data.companies;

router.get('/stocksList', async (req, res) => {
    try {
        const allCompanies = await companies.getAllCompanies();
        res.render('stocks/stocksList', { title: "List of Stocks", allCompanies: allCompanies});
    } catch (e) {
        res.status(500).json({error: e});
    }
    
});

module.exports = router;