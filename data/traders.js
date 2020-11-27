const mongoCollections = require('../config/mongoCollections');
const traders = mongoCollections.traders;
const bcrypt = require('bcryptjs');
const saltRounds = 2;
const { ObjectId } = require('mongodb');


module.exports = {
    async addNewTrader(firstName, lastName, email, gender, age, password) {
        if(!firstName || typeof firstName !== "string") throw 'Your first name must be provided and must be a string.';
        if(!lastName || typeof lastName !== "string") throw 'Your last name must be provided and must be a string.';
        if(!email) throw 'Email must be provided.';
        if(!gender || typeof gender !== "string") throw 'Your gender must be provided and must be a string.';
        if(!age || typeof age !== "number") throw 'Your age must be provided and must be a number.';
        if(!password) throw 'Password must be provided.';

        const hash = await bcrypt.hash(password, saltRounds);

        const tradersCollection = await traders();

        let newTrader = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            gender: gender,
            age: age,
            stockArray: [],
            reviewArray: [],
            hashPassword: hash
        };

        const insertTrader = await tradersCollection.insertOne(newTrader);
        if(insertTrader.insertedCount === 0) throw 'Could not create the new trader.';
        
        const newId = insertTrader.insertedId.toString();
        const getTrader = await this.getTraderById(newId);
 
        return getTrader;
    },

    async getAllTraders() {
        const tradersCollection = await traders();
        const tradersList = await tradersCollection.find({}).toArray();

        if(tradersList.length === 0) {
            return [];
        }

        for(let trader of tradersList) {
            const stringId = trader._id.toString();
            trader._id = stringId;
        }

        return tradersList;
    },

    async getTraderById(id) {
        if(!id || typeof id !== 'string' || id === "" || id.trim() === "") throw 'The id must be provided';
        let parsedId = ObjectId(id);

        const tradersCollection = await traders();

        const foundTrader = await tradersCollection.findOne({_id: parsedId});
        if(foundTrader === null) throw 'There are no traders with the id provided.';

        const stringId = foundTrader._id.toString();
        foundTrader._id = stringId;

        return foundTrader;
    }, 
    
    async getTraderByEmail(email) {
        if(!email) throw 'The email must be provided';

        const tradersCollection = await traders();

        const foundTrader = await tradersCollection.findOne({email: email});
        if(foundTrader === null) throw 'There are no traders with the email provided.';

        const stringId = foundTrader._id.toString();
        foundTrader._id = stringId;

        return foundTrader;
    }
};