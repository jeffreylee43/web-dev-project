const dbConnection = require("../config/mongoConnection");
const data = require("../data");
const companies = data.companies;
const traders = data.traders;

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    let company1 = await companies.addCompany("AAPL");
    let company2 = await companies.addCompany("FB");

    let trader1 = await traders.addNewTrader('Alex', 'Smith', 'asmith@stevens.edu', 'M', 25, 'abcd');

    await db.serverConfig.close();
}

main().catch(console.log); 
