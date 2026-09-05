import { useState } from 'react'
import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {

  return (
    <div className='app-download' id='app-download'>
        <p>Mobile app on working...</p>
    <div className='app-download-platforms'>
        <img src={assets.play_store} alt="play store"/>
        <img src={assets.app_store} alt="app store"/>
    </div>
    </div>
  )
}

export default AppDownload
