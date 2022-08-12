import React from 'react'
import './InputOption.css'

function InputOption({ Icon, title, color, onClick }) {
  return (
    <div className="input_option" onClick={onClick}>
      <Icon style={{ color: color }} />
      <h5>{title}</h5>
    </div>
  )
}

export default InputOption
