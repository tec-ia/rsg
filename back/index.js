const express = require("express")
const cors = require('cors')
const app = express()

require("dotenv").config()

const itemRouterV1 = require("./src/router/v1/item")

app.use(express.json())
app.use(cors())
app.use("/v1/item", itemRouterV1)

app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening ${process.env.APP_PORT}`)
})