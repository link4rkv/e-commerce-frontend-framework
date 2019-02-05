import React from 'react'

const SvgExpand = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M17.333 9.693a1.08 1.08 0 0 0-1.462-.004L12 13.351 8.129 9.69a1.073 1.073 0 0 0-1.462.004l.066-.062a.936.936 0 0 0-.01 1.378l4.553 4.306c.4.378 1.047.38 1.448 0l4.552-4.306a.935.935 0 0 0-.009-1.378l.066.062z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgExpand
