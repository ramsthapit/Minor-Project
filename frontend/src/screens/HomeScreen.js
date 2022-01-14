import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
// import Book from '../components/Book'
import { listBooks } from '../actions/bookActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const bookList = useSelector(state=>state.bookList)
  const { loading, error, books } = bookList
  
  useEffect(() => {
    dispatch(listBooks())
  }, [dispatch])
  
  return (
    <>
      <h1>Latest Books</h1> 
      {loading ? <Loader /> : error ? <Message variant='danger'>{error} </Message> :
      
        <Row>
          {books.map(book => (
            <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
              <Card className='my-3 rounded'>
                <Link to={`/book/${book._id}`}>
                <Card.Img src={book.image} varient='top' />
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      }
      
    </>
  )
}

export default HomeScreen
