const express = require('express');
const { stocks } = require('../config/mongoCollections');
const router = express.Router();
const data = require('../data');
const { getAverageRating } = require('../data/reviews');
const traders = data.traders;
const companies = data.companies;
const reviews = data.reviews;

router.get('/:ticker', async (req, res) => {
    if(!req.session.user) {
        return res.status(403).render('users/notLoggedIn', {title: "Not Logged In", loggedIn: false});
    }
    try {
        const company = await companies.updateCompany(req.params.ticker);
        const allReviews = await reviews.getAllReviews(company);
        let avgRating = await reviews.getAverageRating(company);
        avgRating = avgRating.toFixed(1);
        let actionItem = "" + new Date() + ": Viewed " + company.name + "'s company profile.";
        const updateHistory = await traders.addTraderHistory(req.session.user._id, actionItem);
        let reviewsExist = (Math.round(avgRating) >= 1) ? true : false;
        let tickerExists = await traders.tickerExists(req.session.user._id, company._id);
        res.render('companies/companyProfile', {
            title: 'Company Profile',
            company: company,
            reviews: allReviews,
            reviewsExist: reviewsExist,
            loggedIn: true,
            tickerExists: tickerExists,
            avgRating: avgRating
        });
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/:ticker', async (req, res) => {
    try {
        let bodyData = req.body;
        const company = await companies.getCompany(req.params.ticker);
        if (bodyData.ratingVal){
            const review = await reviews.addReview(bodyData.reviewVal, bodyData.ratingVal, company._id, req.session.user._id);
            let actionItem = "" + review.date + ": Added review to " + company.name + " and gave it a " + review.rating + " star rating.";
            const updateHistory = await traders.addTraderHistory(req.session.user._id, actionItem);
        } else {
            const addToDashBoard = await companies.addStockDashboard(req.session.user._id, company._id);
        }
        res.redirect('/companies/' + req.params.ticker);
    } catch (e) {
        res.status(404).json({ message: e });
    }
});

module.exports = router;
