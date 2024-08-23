const express= require("express")
const cors = require("cors")
const bodyParser = require('body-parser');
const app = express()
const schoolRouter =require("./router/schoolRouter")
const dbMiddleware = require("./middlewares/connectMysql")
require("dotenv").config()

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


const port=process.env.PORT || 8000;
app.listen(port,()=>console.log("Server started"))