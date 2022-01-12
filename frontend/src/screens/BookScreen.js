import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const BookScreen = ({ match }) => {
  const [book, setBooks] = useState('')

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios.get(`/api/books/${match.params.id}`)
      setBooks(data)
    }
    fetchBooks()
  }, [match])
  
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      <Row>
        <Col md={6} >
          <Image src={book.image} alt={book.title} fluid/>
        </Col>
        <Col md={6}>
          <ListGroup varient='flush'>
            <ListGroup.Item>
              <h1>{book.title}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              Author: {book.author}
            </ListGroup.Item>
            <ListGroup.Item>
              Country: {book.country}
            </ListGroup.Item>
            <ListGroup.Item>
              Language: {book.language}
            </ListGroup.Item>
            <ListGroup.Item>
              Year: {book.year}
            </ListGroup.Item>
            <ListGroup.Item>
              Pages: {book.pages}
            </ListGroup.Item>
            <Button variant="warning" size='lg' >BUY</Button>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default BookScreen
