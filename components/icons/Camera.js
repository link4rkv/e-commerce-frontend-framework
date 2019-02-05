import React from 'react'

const SvgCamera = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M21 18.222c0 .982-.733 1.778-1.636 1.778H4.636C3.733 20 3 19.204 3 18.222V8.444c0-.981.733-1.777 1.636-1.777H7.91L9.545 4h4.91l1.636 2.667h3.273c.903 0 1.636.796 1.636 1.777v9.778zM12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      stroke="currentColor"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default SvgCamera
