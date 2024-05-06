import React from 'react'
import NavListItem from '../components/NavListItem'
import navListData from '../data/navListData'
import './header.css'
import Search from '../components/Search'
import Button from '../components/Button'
import ChatBtn from '../components/ChatBtn'
import { IoLogoWechat } from "react-icons/io5";


function Header() {
  return (
    <header>
      <a href="#" className="logo">Cinema</a>
      <ul className="nav">
      {navListData.map(nav => {
               return <NavListItem key={nav._id} nav={nav}/>
            })}
      </ul>
      <Search />
      <ChatBtn icon={<IoLogoWechat className='group-chat-icon'/>}/>
      <Button icon={<ion-icon name="log-in"></ion-icon>} name="Sign Up" to="/signup"/>
    </header>
  )
}

export default Header
