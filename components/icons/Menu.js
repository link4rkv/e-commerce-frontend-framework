import React from 'react'

const SvgMenu = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M3 12.5a.5.5 0 1 1 0-1h18a.5.5 0 1 1 0 1H3zm0-6a.5.5 0 0 1 0-1h18a.5.5 0 1 1 0 1H3zm0 12a.5.5 0 1 1 0-1h18a.5.5 0 1 1 0 1H3z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgMenu
