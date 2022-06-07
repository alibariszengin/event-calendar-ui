import * as React from 'react'
import forgotStyles from '../forgotPassword.module.css'
function SvgComponent(props) {
  const { show } = props
  return (
    <svg
      className={show ? forgotStyles.unvisible : 'dots'}
      height="24pt"
      viewBox="0 -192 512 512"
      width="24pt"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m320 64c0 35.347656-28.652344 64-64 64s-64-28.652344-64-64 28.652344-64 64-64 64 28.652344 64 64zm0 0" />
      <path d="m128 64c0 35.347656-28.652344 64-64 64s-64-28.652344-64-64 28.652344-64 64-64 64 28.652344 64 64zm0 0" />
      <path d="m512 64c0 35.347656-28.652344 64-64 64s-64-28.652344-64-64 28.652344-64 64-64 64 28.652344 64 64zm0 0" />
    </svg>
  )
}

export default SvgComponent
