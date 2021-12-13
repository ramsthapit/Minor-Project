import express from 'express';
import books from './data/books.js';

const app = express()

app.get('/', (req, res) => {
  res.send('api is running')
})

app.get('/api/books', (req, res) => {
  res.json(books)
})

app.get('/api/books/:id', (req, res) => {
  const book = books.find(p => p.id === req.params.id)
  console.log(req.params.id);
  res.json(book)
})

app.listen(5000, console.log("Server running on port 5000"))
