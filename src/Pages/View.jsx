import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addToWishlist } from '../Redux/Slices/wishlistSlice';
import { addToCart } from '../Redux/Slices/cartSlice';
import Header from '../Components/Header';


function View() {
  const {id}= useParams()
  // console.log(id);
  const [product,setProduct]=useState({})
  const wishlist=useSelector(state=>state.wishlistReducer)
  const dispatch=useDispatch()
  useEffect(()=>{
    const allProducts=JSON.parse(sessionStorage.getItem("allProducts"))
    setProduct(allProducts?.find(item=>item.id==id))
  },[])
  // console.log(wishlist);
  // console.log(product);
  const handleWishlist=(product)=>{
    const existingproduct=wishlist?.find(item=>item.id==product.id)
    if (existingproduct){
      alert("Product already in your Wishlist")
    }
    else{
      dispatch(addToWishlist(product))
    }
  }
  return (
   <>
   <Header/>
      <div style={{paddingTop:'100px'}}>
        <div className='container mt-3 mb-5' >
          <div className='row align-items-center'>
            <div className="col-lg-4">
              <img style={{height:'300px'}} className='img-fluid' src={product?.thumbnail} alt="" />
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-6">
              <p className='lead'>PID: {product?.id} </p>
              <h1> {product?.title}</h1>
              <h3 className='text-primary'>$ {product?.price}</h3>
              <p style={{textAlign:'justify'}}> <span className='fw-bolder'>Description </span> : {product?.description}  </p>
              <div className='d-flex justify-content-between mt-5'>
             <button onClick={()=>handleWishlist(product)} className='btn btn-outline-primary'> <i className='fa-solid fa-heart text-danger'></i> Add to Wishlist </button>
  
            <button onClick={()=>dispatch(addToCart(product))} className='btn btn-outline-primary'> <i className='fa-solid fa-cart-plus text-success'></i>  Add to Cart</button>
  
              </div>
            
            </div>
        </div>
  
  
        </div>
      
      </div>
   </>
  )
}

export default View