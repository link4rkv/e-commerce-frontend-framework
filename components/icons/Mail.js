import React from 'react'

const SvgMail = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M2.52 5.754L12 12.39l9.48-6.636A1.507 1.507 0 0 0 20 4.5H4c-.74 0-1.361.546-1.48 1.254zM2.5 6.96V18c0 .824.676 1.5 1.5 1.5h16c.824 0 1.5-.676 1.5-1.5V6.96l-9.213 6.45a.5.5 0 0 1-.574 0L2.5 6.96zm20-.968V18c0 1.376-1.124 2.5-2.5 2.5H4A2.506 2.506 0 0 1 1.5 18V6.006v-.014A2.506 2.506 0 0 1 4 3.5h16a2.506 2.506 0 0 1 2.5 2.492z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgMail
