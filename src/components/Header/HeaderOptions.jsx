import React from 'react'
import './HeaderOptions.css'
import {useSelector} from 'react-redux'
import { selectUser } from '../../features/userSlice'

import { Avatar } from '@mui/material'

function HeaderOptions({ title, avatar, Icon, onClick }) {
  const user = useSelector(selectUser)

  return (
    <div className="option">
      {Icon && <Icon className="option__icon" />}
      {avatar && (
        <Avatar src={user?.photoURL} alt="avatar" className="option__avatar" onClick={onClick}>
          {user?.email[0].toUpperCase()}
        </Avatar>
      )}
      {title && <h3>{title}</h3>}
    </div>
  )
}

export default HeaderOptions
