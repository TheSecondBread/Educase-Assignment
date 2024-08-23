const express= require("express")
const cors = require("cors")
const bodyParser = require('body-parser');
const app = express()
const schoolRouter =require("./router/schoolRouter")
const dbMiddleware = require("./middlewares/connectMysql")
// const createTable = require("./models/createTable")


//createTable

// createTable().then(() => {
//     console.log('Table creation process completed.');
//   }).catch((err) => {
//     console.error('Table creation failed:', err);
//   });


//middlewares
app.use(cors())

app.use(bodyParser.json());

app.use(dbMiddleware)

//routes

//healthcheck
app.get("/",(req,res)=>{
    res.status(200).send("Health OK")
})

//shcool router
app.use("/",schoolRouter)

app.listen(8000,()=>console.log("Server started"))