const fetch = require('node-fetch')

async function getBooks(req, res) {
  const url = 'http://localhost:5000/api/books'
  const { data, status } = await fetch(url)
    .then(async (d) => ({ data: await d.json(), status: d.status }))
    .catch((err) => {
      return {
        status: 404,
        data: err.message
      }
    })
  res.status(status).json(data)
}
async function getBookById(req, res) {
  const { id } = req.params
  const url = `http://localhost:5000/api/books/${id}`
  const { data, status } = await fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText)
      return response
    })
    .then(async (d) => ({ data: await d.json(), status: d.status }))
    .catch((err) => {
      return {
        status: 404,
        data: err.message
      }
    })
  res.status(status).json(data)
}
async function addNewBook(req, res) {
  const url = 'http://localhost:5000/api/books'
  const { title, isbn, author } = req.body
  const { data, status } = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ title, isbn, author }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(async (d) => ({ data: await d.json(), status: d.status }))
    .catch((err) => {
      return {
        status: 404,
        data: err.message
      }
    })
  res.status(status).json(data)
}
async function updateBookById(req, res) {
  const { id } = req.params
  const url = `http://localhost:5000/api/books/${id}`
  const { title, isbn, author } = req.body
  const { data, status } = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({ title, isbn, author }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(async (d) => ({ data: await d.json(), status: d.status }))
    .catch((err) => {
      return {
        status: 404,
        data: err.message
      }
    })
  res.status(status).json(data)
}
async function updateBookTitle(req, res) {
  const { id } = req.params
  const url = `http://localhost:5000/api/books/${id}`
  const { title } = req.body
  const { data, status } = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify({ title }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(async (d) => ({ data: await d.json(), status: d.status }))
    .catch((err) => {
      return {
        status: 404,
        data: err.message
      }
    })
  res.status(status).json(data)
}
async function deleteBookById(req, res) {
  const { id } = req.params
  const url = `http://localhost:5000/api/books/${id}`
  const { data, status } = await fetch(url, {
    method: 'DELETE',
  })
    .then(async (d) => ({ data: await d.json(), status: d.status }))
    .catch((err) => {
      return {
        status: 404,
        data: err.message
      }
    })
  res.status(status).json(data)
}
module.exports = {
  getBooks,
  getBookById,
  addNewBook,
  updateBookById,
  updateBookTitle,
  deleteBookById,
}
