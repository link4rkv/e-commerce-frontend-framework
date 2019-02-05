import React from 'react'

const SvgLogin = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M13.793 12.5H3a.5.5 0 1 1 0-1h10.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708l3.147-3.146zm.207 10a.5.5 0 1 1 0-1h5a1.5 1.5 0 0 0 1.5-1.5V4A1.5 1.5 0 0 0 19 2.5h-5a.5.5 0 1 1 0-1h5A2.5 2.5 0 0 1 21.5 4v16a2.5 2.5 0 0 1-2.5 2.5h-5z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgLogin
