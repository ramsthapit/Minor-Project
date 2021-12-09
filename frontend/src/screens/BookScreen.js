import React from 'react'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import books from '../books'

const BookScreen = ({ match }) => {
  const book = books.find((p) => p.id == match.params.id)
  console.log(book);
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      <Row>
        <Col md={6} >
          <Image src={book.imageLink} alt={book.title} fluid/>
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
