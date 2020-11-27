const express = require('express');
const router = express.Router();
const data = require('../data');
const { getAverageRating } = require('../data/reviews');
const companies = data.companies;
const reviews = data.reviews;

router.get('/:ticker', async (req, res) => {
    try {
        const company = await companies.updateCompany(req.params.ticker);
        const allReviews = await reviews.getAllReviews(company);
        const avgRating = await reviews.getAverageRating(company);
        var reviewsExist = (Math.round(avgRating) >= 1) ? true : false;
        res.render('companies/companyProfile', {
            title: 'Company Profile',
            company: company,
            reviews: allReviews,
            reviewsExist: reviewsExist
        });
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/:ticker', async (req, res) => {
    try {
        let bodyData = req.body;
        const company = await companies.getCompany(req.params.ticker);
        const review = await reviews.addReview(bodyData.reviewVal, bodyData.ratingVal, company._id);
        res.redirect('/companies/' + req.params.ticker);
    } catch (e) {
        res.status(404).json({ message: e });
    }
});

module.exports = router;
