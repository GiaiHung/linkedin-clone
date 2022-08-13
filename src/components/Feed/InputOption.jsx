import React from 'react'
import './InputOption.css'

function InputOption({ Icon, title, color, isActive, onClick }) {
  return (
    <div className="input_option" onClick={onClick} style={{ backgroundColor: isActive ? 'whitesmoke' : ''}}>
      <Icon style={{ color: color }} />
      <h5>{title}</h5>
    </div>
  )
}

export default InputOption
