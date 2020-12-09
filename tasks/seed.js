const dbConnection = require("../config/mongoConnection");
const data = require("../data");
const companies = data.companies;
const traders = data.traders;

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    let company1 = await companies.addCompany("AAPL");
    let company2 = await companies.addCompany("FB");
    let company3 = await companies.addCompany("TSLA");
    let company4 = await companies.addCompany("PTON");
    let company5 = await companies.addCompany("KIRK");
    let company6 = await companies.addCompany("AMZN");
    let company7 = await companies.addCompany("MSFT");
    let company8 = await companies.addCompany("NKE");
    let company9 = await companies.addCompany("PYPL");
    let company10 = await companies.addCompany("KO");
    let company11 = await companies.addCompany("UBER");
    let company12 = await companies.addCompany("JNJ");
    let company13 = await companies.addCompany("WMT");
    let company14 = await companies.addCompany("JPM");
    let company15 = await companies.addCompany("SNAP");
    let company16 = await companies.addCompany("GE");
    let company17 = await companies.addCompany("SIRI");
    let company18 = await companies.addCompany("NFLX");
    let company19 = await companies.addCompany("LYFT");
    let company20 = await companies.addCompany("NVDA");
    let company21 = await companies.addCompany("PFE");
    let company22 = await companies.addCompany("SBUX");
    let company23 = await companies.addCompany("INTC");
    let company24 = await companies.addCompany("TWTR");
    let company25 = await companies.addCompany("F");

    let trader1 = await traders.addNewTrader('Alex', 'Smith', 'asmith@stevens.edu', 'M', 25, 'public', 'abcd');
    let trader2 = await traders.addNewTrader('Jim', 'Lake', 'jlake@stevens.edu', 'M', 28, 'public', 'abcd');
    let trader3 = await traders.addNewTrader('Bob', 'Hardway', 'bhardway@stevens.edu', 'M', 32, 'public', 'abcd');
    let trader4 = await traders.addNewTrader('Kevin', 'Lee', 'klee@stevens.edu', 'M', 18, 'private', 'abcd');
    let trader5 = await traders.addNewTrader('Mike', 'Scott', 'mscott@stevens.edu', 'M', 22, 'private', 'abcd');

    await db.serverConfig.close();
}

main().catch(console.log); 
