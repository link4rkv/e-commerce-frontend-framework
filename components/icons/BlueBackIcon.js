import React from 'react'

const SvgBlueBackIcon = ({ title, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <title>{title}</title>
    <path
      fill="none"
      fillRule="evenodd"
      stroke="#1557BF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M15 20l-8-8 8-8"
    />
  </svg>
)

export default SvgBlueBackIcon
