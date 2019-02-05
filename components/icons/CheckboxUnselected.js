import React from 'react'

const CheckboxUnselected = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <g
      id="system-icons/check-box-unselected"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <rect
        id="Rectangle-Copy-2"
        stroke="#1557BF"
        x="0.5"
        y="0.5"
        width="15"
        height="15"
        rx="2"
      />
    </g>
  </svg>
)

export default CheckboxUnselected
