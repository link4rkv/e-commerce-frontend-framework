import React from 'react'

const SvgAdd = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M12.5 11.5H16a.5.5 0 1 1 0 1h-3.5V16a.5.5 0 1 1-1 0v-3.5H8a.5.5 0 1 1 0-1h3.5V8a.5.5 0 1 1 1 0v3.5zM5 3.5A1.5 1.5 0 0 0 3.5 5v14A1.5 1.5 0 0 0 5 20.5h14a1.5 1.5 0 0 0 1.5-1.5V5A1.5 1.5 0 0 0 19 3.5H5zm0-1h14A2.5 2.5 0 0 1 21.5 5v14a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 19V5A2.5 2.5 0 0 1 5 2.5z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgAdd
