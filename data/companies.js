const mongoCollections = require('../config/mongoCollections');
const stocks = mongoCollections.stocks;
const axios = require('axios');
const reviews = require('./reviews');
const { ObjectID } = require('mongodb');

const apiKey = "bu92bcn48v6t2erin5ig";

module.exports = {
    async getAPICompany(ticker,apiKey){
        const {data} = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`);
        return data
    },
    async addCompany(tickerInput) {
        if(!tickerInput) throw 'The ticker must be provided.';
        if(typeof tickerInput !== "string" || tickerInput === "" || tickerInput.trim() === "") throw 'The ticker must be a string.';
        
        const stocksCollection = await stocks();

        const companyData = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${tickerInput}&token=${apiKey}`);
        const quoteData = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${tickerInput}&token=${apiKey}`);
        const {country, currency, exchange, name, ticker, ipo, marketCapitalization, shareOutstanding, logo, phone, weburl, finnhubIndustry} = companyData.data;
        const {o, h, l, c, pc} = quoteData.data;
        let newCompany = {
            price: c,
            country: country,
            currency: currency,
            exchange: exchange,
            name: name,
            ticker: ticker,
            ipo: ipo,
            marketCapitalization: marketCapitalization,
            shareOutstanding: shareOutstanding,
            logo: logo,
            phone: phone,
            weburl: weburl,
            finnhubIndustry: finnhubIndustry,
            averageRating: null,
            ratingsArr: [],
            reviews: []
        };

        const insertCompany = await stocksCollection.insertOne(newCompany);
        if(insertCompany.insertedCount === 0) throw 'Could not create the company of the stocks.';
        
        const newId = insertCompany.insertedId.toString();
        const getStockCompany = await this.getCompany(ticker);
 
        return getStockCompany;
    },

    async getAllCompanies() {
        const stocksCollection = await stocks();

        const stocksList = await stocksCollection.find({}).toArray();

        if(stocksList.length === 0) return [];

        for(let obj of stocksList) {
            const stringId = obj._id.toString();
            obj._id = stringId;
        }
        return stocksList;
    },

    async getCompany(ticker) {
        if(!ticker) throw 'The ticker must be provided.';
        if(typeof ticker !== "string" || ticker === "" || ticker.trim() === "") throw 'The ticker must be a string.';

        const stocksCollection = await stocks();

        const foundCompany = await stocksCollection.findOne({ticker: ticker});
        if(foundCompany === null) throw 'There are no companies found with the provided ticker.';
        const stringId = foundCompany._id.toString();
        foundCompany._id = stringId;

        return foundCompany;
    },

    async updateCompany(ticker) {
        const gotCompany = await this.getCompany(ticker);
        if (!gotCompany) throw 'Company does not exist within database.';
        
        var objectId = new ObjectID(gotCompany._id);
        const stocksCollection = await stocks();
        const updatedStocksData = {};
        const averageRating = await reviews.getAverageRating(gotCompany);
        
        const companyData = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`);
        const quoteData = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`);
        const {country, currency, exchange, name, ticker1, ipo, marketCapitalization, shareOutstanding, logo, phone, weburl, finnhubIndustry} = companyData.data;
        const {o, h, l, c, pc} = quoteData.data;
        
        let temprating = Math.round(averageRating);
        let ratingsArr = [];
        while (temprating > 0){
            ratingsArr.push("1");
            temprating--;
        }
        updatedStocksData.price = c;
        updatedStocksData.country = gotCompany.country;
        updatedStocksData.currency = gotCompany.currency;
        updatedStocksData.exchange = gotCompany.exchange;
        updatedStocksData.name = gotCompany.name;
        updatedStocksData.ticker = gotCompany.ticker;
        updatedStocksData.ipo = gotCompany.ipo;
        updatedStocksData.marketCapitalization = gotCompany.marketCapitalization;
        updatedStocksData.shareOutstanding = gotCompany.shareOutstanding;
        updatedStocksData.logo = gotCompany.logo;
        updatedStocksData.phone = gotCompany.phone;
        updatedStocksData.weburl = gotCompany.weburl;
        updatedStocksData.finnhubIndustry = gotCompany.finnhubIndustry;
        updatedStocksData.averageRating = averageRating;
        updatedStocksData.ratingsArr = ratingsArr;
        updatedStocksData.reviews = gotCompany.reviews;
        
        const updatedInfo = await stocksCollection.updateOne(
            { _id: objectId },
            { $set: updatedStocksData }
        );
        return await this.getCompany(ticker);
    }
 
};