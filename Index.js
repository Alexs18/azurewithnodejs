let Express = require('express');
let config = require('dotenv');
let ConnectionDatabase = require('./src/Database/Index');
config.config();

let App = Express();

App.get('/Home', (req, res)=>{
    res.send('hello world')
});

App.listen(process.env.portapp || 8080, async()=>{
    await ConnectionDatabase();
    console.log(`we are running the app ${process.env.application_name} in the port ${process.env.portapp }`)
})