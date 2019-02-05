import React from 'react'

const SvgStar = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" {...props}>
    <title>{title}</title>
    <path
      d="M10.103 5.522l3.352.513a.7.7 0 0 1 .394 1.182l-2.446 2.495.57 3.482a.7.7 0 0 1-1.028.727L8.24 12.432a.5.5 0 0 0-.482 0l-2.704 1.489a.7.7 0 0 1-1.028-.727l.57-3.482-2.446-2.495a.7.7 0 0 1 .394-1.182l3.352-.513 1.47-3.118a.7.7 0 0 1 1.266 0l1.47 3.118z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgStar
