import React from 'react'

const SvgBack = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      stroke="currentColor"
      strokeWidth={2}
      d="M15 20l-8-8 8-8"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default SvgBack
