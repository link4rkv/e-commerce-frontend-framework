import React from 'react'

const SvgCategoryActive = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <g fill="none" fillRule="evenodd">
      <path
        d="M21 10h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1"
        fill="currentColor"
      />
      <path
        fill="#00CEE6"
        d="M14 10V2h8zM9 10H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1"
      />
      <path
        d="M21 22.056h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1M9 22.056H3a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1"
        fill="currentColor"
      />
      <path fill="#00CEE6" d="M2 22.056v-8h8z" />
      <path
        d="M21 10h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1zM9 10H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1zM21 22.056h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1zM9 22.056H3a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z"
        stroke="#0D3578"
      />
    </g>
  </svg>
)

export default SvgCategoryActive
