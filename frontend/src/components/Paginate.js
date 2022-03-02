import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ page, pages, keyword = '', isAdmin = false }) => {
  
  if (keyword)
  {
    keyword = keyword.split('?keyword=')[1].split('&')[0]
  }

  return (pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map((x, index) => (index < 10) && (
        <LinkContainer key={x + 1} to={`/?keyword=${keyword}&page=${x + 1}`}>
          <Pagination.Item active={x + 1 === page}>{x + 1} </Pagination.Item>
        </LinkContainer>
      ))}
      <Pagination.Next />
    </Pagination>
  )
  )
}

export default Paginate