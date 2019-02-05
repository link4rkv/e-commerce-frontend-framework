import React from 'react'

const SvgLink = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M9.6 13.3a.5.5 0 1 1 .8-.6 4.5 4.5 0 0 0 6.786.486l2.994-2.993a4.5 4.5 0 0 0-6.357-6.368l-1.72 1.71a.5.5 0 1 1-.706-.71l1.726-1.715a5.5 5.5 0 0 1 7.77 7.784l-3 3a5.5 5.5 0 0 1-8.293-.595zm4.8-2.6a.5.5 0 1 1-.8.6 4.5 4.5 0 0 0-6.786-.486L3.82 13.807a4.5 4.5 0 0 0 .054 6.309 4.498 4.498 0 0 0 6.302.06l1.71-1.71a.5.5 0 0 1 .708.708l-1.717 1.716a5.5 5.5 0 0 1-7.77-7.784l3-3a5.5 5.5 0 0 1 8.293.595z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgLink
