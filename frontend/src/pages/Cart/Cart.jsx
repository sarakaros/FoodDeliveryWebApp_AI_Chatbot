import { useContext, useState } from 'react'
import React from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const {cartItems, food_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext)
    const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((item,index) => {
          if(cartItems[item._id] > 0) {
            return(
              <div>
                <div className='cart-items-title cart-items-item'>
                  <img src={url + "/images/" + item.image} alt=""/>
                  <p>{item.name}</p>
                  <p>{item.price.toLocaleString('en-US').replace(/,/g, ' ')} VND</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{(item.price*cartItems[item._id]).toLocaleString('en-US').replace(/,/g,' ')} VND</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr/>
              </div>
            )
          }
        })}
      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>{getTotalCartAmount().toLocaleString('en-US').replace(/,/g, ' ')} VND</p>
            </div>
            <div className='cart-total-details'>
              <p>Delivery fee</p>
              <p>{(getTotalCartAmount()===0?0:20000).toLocaleString('en-US').replace(/,/g, ' ')} VND</p>
            </div>
            <div className='cart-total-details'>
              <p>Total</p>
              <p>{(getTotalCartAmount()===0?0:getTotalCartAmount()+20000).toLocaleString('en-US').replace(/,/g, ' ')} VND</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to checkout</button>
        </div>
        <div className='cart-promocode'>
          <p>If you have a promo code, enter it here:</p>
          <div className='cart-promocode-input'>
            <input type='text' placeholder='Promo code (e.g. BBQ50)'/>
            <button>submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
