import React from 'react'

const SvgCart = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M8 22a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm9 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM6.25 7.5H20a.5.5 0 0 1 .49.6l-1.375 6.711A2.126 2.126 0 0 1 16.99 16.5H8.345c-1.077.009-1.995-.772-2.136-1.825L4.965 5.458A1.124 1.124 0 0 0 3.841 4.5H2a.5.5 0 0 1 0-1h1.842c1.068.002 1.974.78 2.114 1.825L6.25 7.5zm.95 7.041c.074.55.56.964 1.14.959h8.658a1.129 1.129 0 0 0 1.138-.889L19.387 8.5H6.385L7.2 14.54z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgCart
