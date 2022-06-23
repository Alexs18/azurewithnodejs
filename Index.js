let Express = require('express');
let config = require('dotenv');
let ConnectionDatabase = require('./src/Database/Index');
let {AllMessage, CreateMessgae} = require('./src/Database/Query');
const res = require('express/lib/response');
config.config();

let App = Express();

App.use(Express.json())

App.get('/Home', (req, res)=>{
    res.send('hello world')
});

App.get('/AllData', async(req, res)=>{
    try {
        let Pool = await ConnectionDatabase();
        let result = await Pool.request().query(AllMessage)
        res.status(200).json(result.recordset)   
    } catch (error) {
        res.status(500).json({
            InternalError:error.message
        });
    }
});

App.post('/SendMessage', async(req, res)=>{

    let {Message} = req.body;
    try {
        let Pool = await ConnectionDatabase();
        Pool.request()
        .input("Mensaje", Message)
        .query(`${CreateMessgae}(@Mensaje)`);
        res.status(201).json({
            message:"success your message was created"
        })
    } catch (error) {
        res.status(500).json({
            InternalError:error.message
        });
    }
    
})

App.listen(process.env.portapp || 8080, async()=>{
    await ConnectionDatabase();
    console.log(`we are running the app ${process.env.application_name} in the port ${process.env.portapp }`)
})