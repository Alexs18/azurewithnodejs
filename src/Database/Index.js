let mssql = require('mssql');
let Config = require('../Config/Index');
let config = require('dotenv');
config.config();


async function ConnectionDatabase() {
    try {
        let ResultConnect = await mssql.connect(Config);
        console.log("the database was connected")
        return ResultConnect
    } catch (error) {
        console.log(error)
    }
}

module.exports = ConnectionDatabase;