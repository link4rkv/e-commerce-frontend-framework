import React from 'react'

const SvgShare = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M12.5 3.207V15a.5.5 0 1 1-1 0V3.207L8.354 6.354a.5.5 0 1 1-.708-.708l4-4a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1-.708.708L12.5 3.207zM3.5 12a.5.5 0 1 1 1 0v8A1.5 1.5 0 0 0 6 21.5h12a1.5 1.5 0 0 0 1.5-1.5v-8a.5.5 0 1 1 1 0v8a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 20v-8z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgShare
