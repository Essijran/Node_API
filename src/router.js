const express = require('express')
const fetch = require('node-fetch')

const route = express.Router()


route.get('/books',async (req, res)=>{
    const url = 'http://localhost:5000/api/books'
    const {data, status} = await fetch(url)
    .then( async data => {
        return {data:await data.json(), status: data.status}
    })
    res.status(status).send(data)
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