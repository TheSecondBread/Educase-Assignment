const express = require("express")
const {addSchools,listSchools} = require("../controllers/schoolController")
const schoolRouter = express.Router()

schoolRouter.get("/listSchools",listSchools)


schoolRouter.post("/addSchools",addSchools)

module.exports=schoolRouter