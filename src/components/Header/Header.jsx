import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationsIcon from '@mui/icons-material/Notifications'
import './Header.css'
import HeaderOptions from './HeaderOptions'

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <img src="/images/home-logo.svg" alt="logo" />
        <div className="header__search">
          <SearchIcon />
          <input type="text" spellCheck={false} />
        </div>
      </div>

      <div className="header__right">
        <HeaderOptions Icon={HomeIcon} title="Home" />
        <HeaderOptions Icon={SupervisorAccountIcon} title="My Network" />
        <HeaderOptions Icon={BusinessCenterIcon} title="Jobs" />
        <HeaderOptions Icon={ChatIcon} title="Messaging" />
        <HeaderOptions Icon={NotificationsIcon} title="Notification" />
        <HeaderOptions avatar='https://cdn.unenvironment.org/2022-03/field-ge4d2466da_1920.jpg' title='Me' />
      </div>
    </div>
  )
}

export default Header