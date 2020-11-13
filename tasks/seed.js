const dbConnection = require("../config/mongoConnection");
const data = require("../data");
const companies = data.companies;


const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    let company1 = await companies.addCompany("AAPL");
    let company2 = await companies.addCompany("FB");

    await db.serverConfig.close();
}

main().catch(console.log);
