import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { decQuantity, emptyCart, incQuantity, removeCart } from '../Redux/Slices/cartSlice'
import Header from '../Components/Header'


function Cart() {
  const cart= useSelector(state=>state.cartReducer)
  const [totalAmount,settotalAmount]=useState(0)
  const dispatch=useDispatch()
  const navigate= useNavigate()
  useEffect(()=>{
    if(cart?.length>0){
      settotalAmount(cart?.map(item=>item.totalPrice)?.reduce((p1,p2)=>p1+p2))}
      else{
        settotalAmount(0)
      }
  },[cart])
 const handleCheckout=()=>{
    alert('Order placed successfully...Thank you for shopping with us!!!')
    dispatch(emptyCart())
    navigate('/')

  }

  const handleDecrement=(product)=>{
    if(product.quantity==1){
      dispatch(removeCart(product.id))

    }
    else{
      dispatch(decQuantity(product))
    }
  }
  return (

    <>
    <Header/>
      <div style={{paddingTop:'100px'}}>
       { cart?.length>0?<div className='container'>
       <div className='row'>
        <div className='col-lg-8'>
          <table className='table'>
            <thead>
              <th>#</th>
              <th>Product</th>
              <th>Image</th>
              <th>Quantiy</th>
              <th>Price</th>
              <th>Action</th>
            </thead>
            <tbody >
              {
                cart?.map((product,index)=>(
                  <tr key={index}>
                  <td>{index}</td>
                  <td>{product?.title}</td>
                  <td><img width={'60px'} height={'60px'} src={product?.thumbnail} alt="" /></td>
                  <td>
                    <div className='d-flex align-items-center '>
                      <span onClick={()=>handleDecrement(product)} style={{cursor:'pointer'}} className=' fw-bolder me-3'>-</span>
                      <input type="text" className='form-control'style={{width:'50px'}} value={product?.quantity} readOnly />
                      <span onClick={()=>dispatch(incQuantity(product))} style={{cursor:'pointer'}} className=' fw-bolder ms-2'>+</span>
  
                      </div></td>
                  <td className='text-primary'>$ {product?.totalPrice}</td>
                  <td>
                    <button onClick={()=>dispatch(removeCart(product))} className='btn btn-link'><i className="fa-solid fa-trash text-danger"></i> </button>
                  </td>
                  </tr>
                ))
              }
  
            </tbody>
          </table>
          <div className='float-end mt-3'>
            <button onClick={()=>dispatch(emptyCart())} className='btn btn-outline-danger me-3'> Empty Cart</button>
            <Link  to={'/'} className='btn btn-outline-primary' > Shop More</Link>
  
          </div>
  
  
  
        </div>
        <div className='col-lg-4'>
          <div className="shadow border rounded p-4">
            <h5>Total Products: <span className='fw-bolder text-danger'>{cart?.length} </span></h5>
            <h4>Total Amount:<span className='fw-bolder text-danger'>{totalAmount}</span></h4>
            <hr />
            <div className='d-grid mt-4'>
              <div onClick={()=>handleCheckout()} className='btn btn-success'>Checkout
  
              </div>
  
            </div>
          </div>
  
        </div>
       </div>
  
        </div>:
         <div style={{height:'40vh'}} className='d-flex flex-column justify-content-center align-items-center w-100 mb-5'>
         <img  className='img-fluid' src="https://i.postimg.cc/HxmBRLZm/Empty-Cart-removebg-preview.png" alt="" />
                    <h2 className='text-primary ' style={{marginBottom:'100px'}}>Your cart is empty!!!</h2>
  
          </div>
  
        }
      </div>
    </>
   
  )
}

export default Cart