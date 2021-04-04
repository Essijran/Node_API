const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000

app.use(bodyParser())

app.use('/book',(req,res)=>{
    const { name, author } = req.body
    res.json({
        name,
        author
    })
}) 
app.use('/user/:id',(req, res)=>{
    const userId = req.params.id 
    const {cal} = req.query
    
    const msg = cal ? 'Sorry we cannot show you the ID': `the userId is : ${userId}` 
    res.send(msg)
})

app.use('/', (req, res)=>{
    res.send('Testing the endpoint')
})


app.listen(port, ()=>console.log(`Listening on port ${port}`))






