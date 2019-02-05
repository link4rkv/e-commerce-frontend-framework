import React from 'react'

const SvgSearch = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M16.5 15.792l4.854 4.854a.5.5 0 0 1-.708.708l-4.854-4.855a8 8 0 1 1 .707-.707zm-1.004-.39a7 7 0 1 0-.094.094.505.505 0 0 1 .094-.093z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgSearch
