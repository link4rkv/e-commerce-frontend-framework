import React from 'react'

const SvgLogout = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M10.207 11.5H21a.5.5 0 1 1 0 1H10.207l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L10.207 11.5zM10 22.5H5A2.5 2.5 0 0 1 2.5 20V4A2.5 2.5 0 0 1 5 1.5h5a.5.5 0 1 1 0 1H5A1.5 1.5 0 0 0 3.5 4v16A1.5 1.5 0 0 0 5 21.5h5a.5.5 0 1 1 0 1z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgLogout
