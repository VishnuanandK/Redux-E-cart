import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromeWishlist } from '../Redux/Slices/wishlistSlice'
import { addToCart } from '../Redux/Slices/cartSlice'
import Header from '../Components/Header'


function Wishlist() {
  // get wishist from store

  const wishlist =useSelector(state=>state.wishlistReducer)
  const dispatch = useDispatch()

   const handleRemoveWishlist =(product)=>{
    dispatch(removeFromeWishlist(product?.id))
    dispatch(addToCart(product))
   }
  return (
    <>
    <Header/>
      <div style={{paddingTop:'100px'}}>
        <div className='container'>
          <Row className='mt-5'>
          {
            wishlist?.length>0?wishlist?.map((product,index)=>(
              <Col key={index} style={{marginBottom:'10px'}} sm={12} md={6} lg={4} xl={3}>
             
             <Card  className='card shadow' style={{ width: '18rem' }}>
        <Card.Img height={'200px'} variant="top" src={product?.thumbnail} />
        <Card.Body>
          <Card.Title>{product?.title.slice(0,20)}...</Card.Title>
          <div className='d-flex justify-content-between'>
  <button onClick={()=>dispatch(removeFromeWishlist(product?.id))} className='btn btn-link' > <i className='fa-solid fa-heart-circle-minus text-danger' > </i> </button>
  <button onClick={()=>handleRemoveWishlist(product)} className='btn btn-link'> <i className='fa-solid fa-cart-plus text-success'> </i></button>
          </div>
          
        </Card.Body>
      </Card>
  
              </Col>
            )):
            <div style={{height:'40vh'}} className='d-flex flex-column justify-content-center align-items-center w-100 mb-5'>
              <img  className='img-fluid' src="https://i.postimg.cc/HxmBRLZm/Empty-Cart-removebg-preview.png" alt="" />
                         <h2 className='text-primary ' style={{marginBottom:'100px'}}>Your wishlist is empty!!!</h2>
  
               </div>
          }
  
          </Row>
  
        </div>
  
      </div>
    </>
  )
}

export default Wishlist