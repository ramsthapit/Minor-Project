import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Book = ({book}) => {
  return (
    <Card className='my-3 rounded'>
      <Link to={`/book/${book._id}`}>
        <Card.Img src={book.image} varient='top' />
      </Link>
      <Card.Body>
        <Link to={`/book/${book._id}`}>
          <Card.Title as= 'div'>
            <strong>{book.title}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <div className='my-3'>
            Author: {book.author}
          </div>
        </Card.Text>
        <Card.Text as='div'>
          <div className='my-3'>
            Language: {book.language}
          </div>
        </Card.Text>
        <Card.Text as='div'>
          <div className='my-3'>
            Country: {book.country}
          </div>
        </Card.Text>
        <Card.Text as='h3'>
          ${book.pages}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Book
