import { useContext, useState } from 'react'
import React from 'react'
import'./PlaceOrder.css'
import '../Cart/Cart.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'


const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data,setData] = useState({
    name: "", 
    email: "",
    street: "",
    ward: "",
    city: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value }));
  };
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
       let itemInfo = item;
       itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);

      }  
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    let response = await axios.post(url+"/api/order/place", orderData, {headers:{token}});
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  };

  return (
    <form onSubmit = {placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery information</p>
        <div className='multi-field'>
          <input required name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your name'/>
        </div>
        <input required name= 'email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email address'/>
        <input required name= 'street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street'/>
        <div className='multi-field'>
          <input required name= 'ward' onChange={onChangeHandler} value={data.ward} type='text' placeholder='Ward'/>
          <input required name= 'city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City'/>
        </div>
        <input required name= 'phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone number'/>
      </div>
      <div className='place-order-right'>
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
          <button type='submit'>Proceed to payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
