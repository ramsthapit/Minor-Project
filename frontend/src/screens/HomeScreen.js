import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Book from '../components/Book'

const HomeScreen = () => {
  const [books, setBooks] = useState('')
  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios.get('/api/books')
      setBooks(data)
    }
    fetchBooks()
  }, [])
  const Books = Object.values(books);
  return (
    <>
      <h1>Latest Books</h1> 
      <Row>
        {Books.map(book => (
          <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
            <Book book={book} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
