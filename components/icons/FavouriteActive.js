import React from 'react'

const SvgFavouriteActive = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M18.766 6.238a4.203 4.203 0 0 0-5.955 0L12 7.052l-.812-.814a4.201 4.201 0 0 0-5.955 0 4.234 4.234 0 0 0 0 5.974l.812.814L12 19l5.955-5.974.811-.814a4.23 4.23 0 0 0 0-5.974z"
      stroke="#DD0D42"
      fill="#FC414B"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default SvgFavouriteActive
