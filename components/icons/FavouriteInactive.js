import React from 'react'

const SvgFavouriteInactive = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M20.5 9.225a4.73 4.73 0 0 1-1.38 3.34l-6.766 6.788a.5.5 0 0 1-.708 0l-6.767-6.788a4.734 4.734 0 0 1 0-6.68 4.701 4.701 0 0 1 6.664 0l.457.458.457-.458a4.703 4.703 0 0 1 6.663 0 4.73 4.73 0 0 1 1.38 3.34zM12 18.292l5.6-5.62.812-.813a3.73 3.73 0 0 0 0-5.268 3.703 3.703 0 0 0-5.247 0l-.811.814a.5.5 0 0 1-.708 0l-.812-.814a3.701 3.701 0 0 0-5.247 0 3.734 3.734 0 0 0 0 5.268L12 18.292z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgFavouriteInactive
