import './Navbar.css'
import { assets } from '../../assets/assets'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useContext } from 'react';
import { AdminContext } from '../../AdminContext/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const {setToken, setUserInfo} = useContext(AdminContext);
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
        <img className='logo' src={assets.logo} alt=''/>
        <div className='profile'>
          <p onClick={logout}>Log out</p>
          <i className="fas fa-user-circle profile-icon"></i>
        </div>
    </div>
  )
}

export default Navbar
