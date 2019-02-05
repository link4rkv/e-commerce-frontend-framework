import React from 'react'

const SvgInfo = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M12 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm0-1a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19zM12 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1 7a1 1 0 0 1-2 0v-4a1 1 0 0 1 2 0v4z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgInfo
