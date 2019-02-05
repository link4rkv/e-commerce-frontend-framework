import React from 'react'

const SvgCollapse = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M17.333 15.307a1.08 1.08 0 0 1-1.462.004L12 11.649 8.129 15.31a1.073 1.073 0 0 1-1.462-.004l.066.062a.936.936 0 0 1-.01-1.378l4.553-4.306c.4-.378 1.047-.38 1.448 0l4.552 4.306c.4.378.4.992-.009 1.378l.066-.062z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgCollapse
