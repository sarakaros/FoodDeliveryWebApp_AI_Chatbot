import { useState } from 'react'
import React from 'react'
import './Header.css'

const Header = () => {

  return (
    <div className='header'>
      <div className='header-contents'>
        <h2>Order your favourite food here!</h2>
        <p>Welcome to our food delivery service — where getting a good meal is made simple. Whether you're craving comfort food or just need something quick after a long day, we've built this platform to help you find what you're looking for without the hassle. We partner with local restaurants, small kitchens, and trusted vendors to bring a variety of options right to your door. No gimmicks — just honest food, delivered on time. You can browse menus, choose your favourite dish, and track your order all in one place. Our focus is on reliability, clarity, and making sure you get what you order.<br/>Click View menu to explore more!</p>
        <button>
          <a href='#explore-menu'>
            View menu
          </a>
        </button>
      </div>
    </div>
  )
}

export default Header
