const express= require("express");
const {PORT} = require("./config");

const apiRoutes = require('./routes')
const CRON = require('./utils/common/cron-jobs')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", apiRoutes);

app.listen(PORT, ()=>{
    console.log(`Successfully started the server at PORT :${PORT}`);
    CRON();
    
})

