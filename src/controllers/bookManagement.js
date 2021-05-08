const fetch = require('node-fetch')

async function getBooks(req, res){
  const url = 'http://localhost:5000/api/books'
  const { data, status } = await fetch(url)
    .then(async (d) => ({ data: await d.json(), status: d.status }))
    .catch(err => {throw (err)})
  res.status(status).send(data)
}
async function getBookById(req, res){
  const { id } = req.params
  const url = `http://localhost:5000/api/books/${id}`
  const { data, status } = await fetch(url)
    .then(response => {
        if (!response.ok) throw new Error(response.statusText) 
        return response.json()
    })
    .then(async (d) => ({ data: await d.json(), status: d.status }))
    .catch(err => {res.status(404).send(err.message)})
  res.status(status).send(data)
  }
async function addNewBook(req, res){
    const url = 'http://localhost:5000/api/books'
  const {title, isbn, author} = req.body
  const { data, status } = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({title, isbn, author}),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(async (d) => ({ data: await d.json(), status: d.status }))
    .catch(err => {throw (err)})
  res.status(status).send(data)
}
async function updateBookById(req, res){
    const { id } = req.params
    const url = `http://localhost:5000/api/books/${id}`
    const {title, isbn, author} = req.body
    const { data, status } = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({title, isbn, author}),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(async (d) => ({ data: await d.json(), status: d.status }))
      .catch(err => {throw (err)})
    res.status(status).send(data)
}
async function updateBookTitle(req, res){
    const {id} = req.params
    const url = `http://localhost:5000/api/books/${id}`
    const {title} = req.body
    const {data, status} = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({title}),
        headers: {
            'content-type': 'application/json',
        },
    })
     .then(async d =>({data: await d.json(), status: d.status}))
     .catch(err => {throw (err)})
    res.status(status).send(data)
}
async function deleteBookById(req, res){
    const {id} = req.params
    const url = `http://localhost:5000/api/books/${id}`
    const {data, status} = await fetch (url, {
        method: 'DELETE'
    })
    .then(async d =>({data: await d.json(), status: d.status}))
    .catch(err => {return Promise.reject()})
    res.status(status).send(data)
}
module.exports = {
    getBooks,
    getBookById,
    addNewBook,
    updateBookById,
    updateBookTitle,
    deleteBookById
}