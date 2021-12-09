import React from 'react'
import { Col, Row } from 'react-bootstrap'
import books from '../books'

const BookScreen = () => {
  return (
    <>
      <h1>Latest Books</h1> 
      <Row>
        {books.map(book => (
          <Col sm={12} md={6} lg={4} xl={3}>
            
          </Col>
        ))}
      </Row>
    </>
  )
}

export default BookScreen
