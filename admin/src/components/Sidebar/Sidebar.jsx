import { useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = () => {

  return (
    <div className='sidebar'>
        <div className='sidebar-options'>
            <NavLink to='/add' className='sidebar-option'>
                <i className="fas fa-plus"></i>
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className='sidebar-option'>
                <i className="fas fa-list"></i>
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className='sidebar-option'>
                <i className="fas fa-receipt"></i>
                <p>Order</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar
