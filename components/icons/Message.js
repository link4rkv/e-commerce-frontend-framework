import React from 'react'

const SvgMessage = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M3.5 19.793l3.146-3.147A.5.5 0 0 1 7 16.5h12a1.5 1.5 0 0 0 1.5-1.5V5A1.5 1.5 0 0 0 19 3.5H5A1.5 1.5 0 0 0 3.5 5v14.793zM7.207 17.5l-3.853 3.854A.5.5 0 0 1 2.5 21V5A2.5 2.5 0 0 1 5 2.5h14A2.5 2.5 0 0 1 21.5 5v10a2.5 2.5 0 0 1-2.5 2.5H7.207z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgMessage
