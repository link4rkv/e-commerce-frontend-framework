import React from 'react'

const SvgDownload = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M11.5 14.793V2a.5.5 0 1 1 1 0v12.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708l3.146 3.147zM2.5 17a.5.5 0 1 1 1 0v3A1.5 1.5 0 0 0 5 21.5h14a1.5 1.5 0 0 0 1.5-1.5v-3a.5.5 0 1 1 1 0v3a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 20v-3z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgDownload
