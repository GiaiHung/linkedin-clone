import React, { useEffect, useState } from 'react'
import { logout } from '../../features/userSlice'
import { auth } from '../../firebase'
import { useDispatch } from 'react-redux'

import './Header.css'
import HeaderOptions from './HeaderOptions'

import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationsIcon from '@mui/icons-material/Notifications'

function Header() {
  const dispatch = useDispatch()
  const getWindowWidth = () => window.innerWidth
  const [width, setWidth] = useState(getWindowWidth())

  const onLogout = () => {
    dispatch(logout())
    auth.signOut()
  }

  useEffect(() => {
    const handleResize = () => {
      setWidth(getWindowWidth())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
        {width > 768 && (
          <>
            <HeaderOptions Icon={HomeIcon} title="Home" />
            <HeaderOptions Icon={SupervisorAccountIcon} title="My Network" />
            <HeaderOptions Icon={BusinessCenterIcon} title="Jobs" />
            <HeaderOptions Icon={ChatIcon} title="Messaging" />
            <HeaderOptions Icon={NotificationsIcon} title="Notification" />
          </>
        )}
        <HeaderOptions avatar onClick={onLogout} />
      </div>
    </div>
  )
}

export default Header
