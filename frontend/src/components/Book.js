import React from 'react'
import { Card } from 'react-bootstrap'

const Book = ({book}) => {
  return (
    <Card className='my-3 rounded'>
      <a href={'/book/${book.title}'}>
        <Card.Img src={book.imageLink} varient='top' />
      </a>
      <Card.Body>
        <a href='/book/${book.title}'>
          <Card.Title as= 'div'>
            <strong>{book.title}</strong>
          </Card.Title>
        </a>
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
