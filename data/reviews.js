const { ObjectID } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
const stocks = mongoCollections.stocks;
var path = require('path');
var companies = require( path.resolve( __dirname, "./companies.js" ) );

module.exports = {
    async getReviewById(id){
        if (!id) throw 'Must provide an id';
        if (typeof id != 'string' || !id.replace(/\s/g,'').length) throw 'Type of ID must be a non-empty string';
        try {
            var objectId = new ObjectID(id);
        } catch (e){
            throw 'Error: Argument ID passed in must be a single String of 12 bytes or a string of 24 hex characters';
        }
        if (!objectId) throw 'Id provided is not a valid Object ID.';
        const reviewsCollection = await reviews();
        const review = await reviewsCollection.findOne({ _id: objectId });
        if (!review) throw 'No review found for specified id.'
        review._id = `${review._id}`;
        return review;
    },
    async addReview(reviewpost, rating, companyID) {
        var date = new Date();
        let temprating = rating;
        let ratingsArr = [];
        while (temprating > 0){
            ratingsArr.push("1");
            temprating--;
        }
        let newReview = {
            companyID: companyID,
            date: date,
            ratingsArr: ratingsArr,
            rating: Number(rating),
            review: reviewpost
        }
        const reviewCollection = await reviews();
        const insertInfo = await reviewCollection.insertOne(newReview);
        if (insertInfo.insertedCount === 0) throw 'Could not add Review';
        const newId = insertInfo.insertedId.toString();
        const review = await this.getReviewById(newId);

        //Add review id to company collection
        const companiesCollection = await stocks();
        var objectId = new ObjectID(review.companyID);
        const company1 = await companiesCollection.findOne({ _id: objectId });
        let updatedCompanyData = {};
        let arr = company1.reviews;
        arr.push(newId);
        updatedCompanyData.reviews = arr;
        const updatedInfo = await companiesCollection.updateOne(
            { _id: objectId },
            { $set: updatedCompanyData }
        );
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not update company reviews successfully';
        }
        return review;
    },

    async getAllReviews(company){
        let output = [];
        let allReviews = company.reviews;
        for (let r in allReviews){
            const rev = await this.getReviewById(allReviews[r]);
            output.push( rev );
        }
        if (output.length == 0){
            return [{review: "Reviews will appear here. Be the first to enter a review for this stock!"}];
        };
        return output;
    },
    
    async getAverageRating(company){
        const allReviews = await this.getAllReviews(company);
        var avgRating = 0;
        for (r in allReviews){
            avgRating += allReviews[r].rating;
        }
        return avgRating/allReviews.length;
    }
};