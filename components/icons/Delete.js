import React from 'react'

const SvgDelete = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M16.5 5.5H21a.5.5 0 1 1 0 1h-1.5V20a2.5 2.5 0 0 1-2.5 2.5H7A2.5 2.5 0 0 1 4.5 20V6.5H3a.5.5 0 0 1 0-1h4.5V4A2.5 2.5 0 0 1 10 1.5h4A2.5 2.5 0 0 1 16.5 4v1.5zm-1 0V4A1.5 1.5 0 0 0 14 2.5h-4A1.5 1.5 0 0 0 8.5 4v1.5h7zm3 1h-13V20A1.5 1.5 0 0 0 7 21.5h10a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 4.5a.5.5 0 1 1 1 0v6a.5.5 0 1 1-1 0v-6zm4 0a.5.5 0 1 1 1 0v6a.5.5 0 1 1-1 0v-6z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgDelete
