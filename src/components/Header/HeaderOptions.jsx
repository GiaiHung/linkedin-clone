import React from 'react'
import './HeaderOptions.css'

import {Avatar} from '@mui/material'

function HeaderOptions({ title, Icon, avatar }) {
  return (
    <div className='option'>
      {Icon && <Icon className='option__icon' />}
      {avatar && <Avatar src={avatar} alt='avatar' className='option__avatar'>{title}</Avatar>}
      <h3>{title}</h3>
    </div>
  )
}

export default HeaderOptions
