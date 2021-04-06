const express = require('express')

const route = express.Router()

route.get('/users',(req, res)=>{
    res.status(201).send(`Testing the endpoint ${req.age}`)
})

route.get('/user/:id',(req, res)=>{
    const userId = req.params.id 
    const {cal} = req.query
    
    const msg = cal === 'true' ? 'Sorry we cannot show you the ID': `the userId is : ${userId}` 
    res.send(msg)
})

route.post('/book',(req,res)=>{
    const { name, author } = req.body
    res.json({
        name,
        author
    })
}) 

module.exports = route