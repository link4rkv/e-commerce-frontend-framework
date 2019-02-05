import React from 'react'

const SvgTime = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M12 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm0-1a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19zm3.354-6.854a.5.5 0 0 1-.708.708l-3-3A.5.5 0 0 1 11.5 12V6a.5.5 0 1 1 1 0v5.793l2.854 2.853z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgTime
