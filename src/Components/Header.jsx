import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchByProducts } from '../Redux/Slices/productSlice';

function Header({insideHome}) {
  const wishlist = useSelector(state => state.wishlistReducer)
  const cart=useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()
  

  return (
    <div>
      <Navbar expand="lg" className="bg-primary w-100 position-fixed" style={{ zIndex: '2' }}>
        <Container>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Navbar.Brand className='text-white'>
              <img
                alt=""
                src="https://i.postimg.cc/c1DSzB5F/Shopping-Cart-Clipart-Png-Photo-29973-png-Free-PNG-Images-removebg-preview.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Daily Cart</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
{           insideHome&&<Nav.Link> <input onChange={e=>dispatch(searchByProducts(e.target.value.toLowerCase()))} type="text" style={{width:'400px'}}  placeholder='Search' className='rounded-5 form-control' /> </Nav.Link>
}  
            <Nav.Link><Link to={'/wishlist'} style={{ textDecoration: 'none', color: 'white' }}> <i class="fa-solid fa-heart me-1" style={{ color: 'red' }}></i>Wishlist <Badge className='bg-dark'>{wishlist?.length}</Badge> </Link></Nav.Link>
              <Nav.Link ><Link to={'/cart'} style={{ textDecoration: 'none', color: 'white' }}> <i class="fa-solid fa-cart-shopping me-1" style={{ color: 'white' }}></i>Cart <Badge className='bg-dark'>{cart?.length}</Badge></Link></Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header