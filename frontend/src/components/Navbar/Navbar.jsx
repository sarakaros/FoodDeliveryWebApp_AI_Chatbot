import { useContext, useState } from 'react'
import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { PowerIcon } from '@heroicons/react/24/outline'
import '@fortawesome/fontawesome-free/css/all.min.css';


const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");

    const { getTotalCartAmount, token, setToken, userInfo, setUserInfo } = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
      const confirmed = window.confirm("Are you sure you want to log out?");
      if (!confirmed) return;
      localStorage.removeItem("token");
      setToken("");
      setUserInfo(null);
      navigate("/");
    }

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo2} className='logo'/>
      </Link>
      <ul className='navbar-menu'>
        <Link to='/'  onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <FontAwesomeIcon icon={faShoppingBasket} className="basket-icon" />
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
          </Link>
        </div>
        {!token?<button onClick={() => setShowLogin(true)}>Sign in</button>:<div className='navbar-profile'>
          <Link to='userpage'>
            <i className="fas fa-user-circle profile-icon"></i>
            <span className="username-text">
              {userInfo?.name || "My Account"}
            </span>
          </Link>
          <ul className="nav-profile-dropdown">
            <Link to='/myorders'>
              <li>
                <ShoppingBagIcon className="icon-size bag-icon" />
                <p> Orders </p>
              </li>
            </Link>
            <hr /> 
              <li onClick= {logout}>
                <PowerIcon className="icon-size logout-icon" />
                <p> Logout </p>
              </li>
          </ul>
      </div>}
      </div>
    </div>
  )
}

export default Navbar
