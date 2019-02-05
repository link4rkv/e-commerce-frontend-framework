import React from 'react'

const SvgRemove = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" {...props}>
    <title>{title}</title>
    <path
      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-.707L5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
      fill="#696969"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgRemove
