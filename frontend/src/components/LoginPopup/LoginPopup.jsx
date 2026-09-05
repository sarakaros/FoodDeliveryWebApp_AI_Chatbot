import { use, useContext, useState } from 'react'
import React from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const LoginPopup = ({setShowLogin}) => {

  const {url, setToken, setUserInfo} = useContext(StoreContext);

    const [currState, setCurrState] = useState('Login');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({ ...data, [name]: value }));
    }
  
    const onLogin = async (event) => {
      event.preventDefault();
      let newUrl = url;
      if (currState === "Login") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }
      const response = await axios.post(newUrl, data);
      
      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        setShowLogin(false);

        try {
          const userRes = await axios.get(`${url}/api/user/info`, {
            headers: { token }
          });
          if (userRes.data.success) {
            setUserInfo(userRes.data.user);
          } else {
            console.error("Failed to fetch user info:", userRes.data.message);
          }
        } catch (err) {
          console.error("Error fetching user info:", err);
        }
      } else {
        alert(response.data.message);
      }

    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt=""/>
        </div>
        <div className='login-popup-inputs'>
            {currState==="Login"?<></>:<input name ='name' onChange={onChangeHandler} value = {data.name} type='text' placeholder='your name' required/>}
            <input name = 'email' onChange={onChangeHandler} value={data.email} type='email' placeholder='your email' required/>
            <input name = 'password' onChange = {onChangeHandler} value = {data.password} type='password' placeholder='password' required/>
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
        {currState==="Login"
            ?<p style={{textAlign:'center'}}>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            :<>
              <div className='login-popup-condition'>
                <input type='checkbox' required/>
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
              </div>
              <p style={{textAlign:'center'}}>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
            </>
        }
      </form>
    </div>
  )
}

export default LoginPopup
