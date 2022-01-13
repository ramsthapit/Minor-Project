import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Book from '../components/Book'
import { listBooks } from '../actions/bookActions'

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
      {loading ? <h1>Loading...</h1> : error ? <h3>{error} </h3> :
      
        <Row>
          {books.map(book => (
            <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
              <Book book={book} />
            </Col>
          ))}
        </Row>
      }
      
    </>
  )
}

export default HomeScreen
