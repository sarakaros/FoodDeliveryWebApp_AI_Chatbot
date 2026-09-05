import { useContext, useState } from 'react'
import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import styled from 'styled-components';

const FoodItem = ({id,name,price,description,image}) => {

    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);

    const [rating, setRating] = useState(0);

 return (
   <div className='food-item'>
    <div className='food-item-img-container'>
        <img className='food-item-image' src={url+"/images/"+image}/>
        {!cartItems[id]
            ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white}/>
            :<div className='food-item-counter'>
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green}/>
            </div>
        }
    </div>
    <div className='food-item-info'>
        <div className='food-item-name-rating'>
            <p>{name}</p>
            <styled>
                <div className="rating">
                    {[5, 4, 3, 2, 1].map((star) => (
                    <React.Fragment key={star}>
                        <input
                        type="radio"
                        id={`${id}-star${star}`}
                        name={`rating-${id}`}
                        value={star}
                        checked={rating === star}
                        onChange={() => setRating(star)}
                        />
                        <label htmlFor={`${id}-star${star}`}></label>
                    </React.Fragment>
                    ))}
                </div>
            </styled>
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>{price.toLocaleString('en-US').replace(/,/g, ' ')} VND</p>
    </div>
   </div>
  )
}

export default FoodItem
