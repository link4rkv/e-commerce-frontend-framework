import React from 'react'

const SvgCreditCard = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M3.5 10h17V8A1.5 1.5 0 0 0 19 6.5H5A1.5 1.5 0 0 0 3.5 8v2zm0 1v5A1.5 1.5 0 0 0 5 17.5h14a1.5 1.5 0 0 0 1.5-1.5v-5h-17zM5 5.5h14A2.5 2.5 0 0 1 21.5 8v8a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 16V8A2.5 2.5 0 0 1 5 5.5z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgCreditCard
