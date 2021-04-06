const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const app = express()
const port = 4000



app.use(bodyParser.json())

app.use((req, res, next)=>{
    req.age = 19
    next()
})

app.use('/api/v1',router)

app.listen(port, ()=>console.log(`Listening on port ${port}`))






