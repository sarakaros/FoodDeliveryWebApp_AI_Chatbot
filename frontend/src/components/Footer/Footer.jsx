import { useState } from 'react'
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {

  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={assets.logo2}/>
                <p>Leafy. is a food delivery platform launched in 2025 with a simple goal: make good food easier to get. We’re built on three core values — Fast, Convenient, and Tasty. That means quick delivery you can count on, an easy-to-use website, and food that’s worth coming back for. We work closely with trusted local kitchens to bring real meals to real people, without overpromising or cutting corners. Whether it’s lunch on a busy day or dinner you don’t want to cook, Leafy. is here to make it simpler. Explore, order, and eat to your heart's content.</p>
                <div className="footer-social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebookF} className='social-icon'/>
                    </a>
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faXTwitter} className='social-icon'/>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className='social-icon'/>
                    </a>
                </div>
            </div>
            <div className='footer-content-center'>
                <h2>Company</h2>
                <ul>
                    <li>About us</li>
                    <li>FAQs</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>Get in touch</h2>
                <ul>
                    <li>+84-292-xxx-xxx</li>
                    <li>contact@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2025 © - All right reserved.</p>
    </div>
  )
}

export default Footer
