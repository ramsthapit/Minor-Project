import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopBooks } from '../actions/bookActions'
import { useDispatch, useSelector } from 'react-redux'

const BookCarousel = () => {
    const dispatch= useDispatch()

    const bookTopRated = useSelector(state=> state.bookTopRated)
    const { loading, error, books } = bookTopRated

    useEffect(() => {
        dispatch(listTopBooks()) 
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message variant= 'danger'> { error }</Message>: (
        <Carousel pause= 'hover' 
        className='bg-transparent, my-3, p-3 rounded'
        >
            {books.map(book =>(
                
                <Carousel.Item key={book._id}>
                    <Link to = {`/book/${book._id}`}>
                        < Image src = {book.coverImg} alt={book.name}   width="300" height="450" fluid />
                        <Carousel.Caption className ='carousel-caption'>
                            <h2> {book.title} (${book.price}) </h2>
                        </Carousel.Caption>
                        
                    </Link>
                </Carousel.Item>
            )
                )}
        </Carousel>
    )
    
    }

export default BookCarousel