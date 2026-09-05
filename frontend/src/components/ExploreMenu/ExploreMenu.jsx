import { useState } from 'react'
import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Exlpore our menu</h1>
        <p className='explore-menu-text'>Take a look at the menu! There are  a variety of not only eye-catching but also tasty dishes. We don’t throw random items on a list; we curate meals people actually want to eat. Whether you're in the mood for something hearty, something light, or something that hits that perfect spicy-salty-sweet balance, it’s all here. Scroll through and you’ll find classics done right, plus a few surprises you didn’t know you were craving!</p>
        <div className='explore-menu-list'>
            {menu_list.map((item, index) => {
                return (
                    <div onClick={() => setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image}/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>

        <hr/>
    </div>
  )
}

export default ExploreMenu
