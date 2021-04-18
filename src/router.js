const express = require('express')
const fetch = require('node-fetch')

const route = express.Router()

route.get('/books', async (req, res) => {
  const { env } = req.headers
  const url = env === 'prod' ? 'http://localhost:5000/api/books/4' : 'http://localhost:5000/api/books'

  const { data, status } = await fetch(url)
    .then(async (d) => ({ data: await d.json(), status: d.status }))
  res.status(status).send(data)
})

route.get('/books/:id', async (req, res) => {
  const { id } = req.params
  const url = `http://localhost:5000/api/books/${id}`
  const { data, status } = await fetch(url)
    .then(async (d) => ({ data: await d.json(), status: d.status }))
  res.status(status).send(data)
})

route.post('/books', async (req, res) => {
  const url = 'http://localhost:5000/api/books'
  const bookObj = { name: req.body.name }
  const { data, status } = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(bookObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(async (d) => ({ data: await d.json(), status: d.status }))
  res.status(status).send(data)
})

route.put('/books/:id', async (req, res) => {
  const { id } = req.params
  const url = `http://localhost:5000/api/books/${id}`
  const bookObj = { name: req.body.name }
  const { data, status } = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(bookObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(async (d) => ({ data: await d.json(), status: d.status }))
  res.status(status).send(data)
})

module.exports = route
