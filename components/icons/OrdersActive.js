import React from 'react'

const SvgOrdersActive = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <g fill="none" fillRule="evenodd">
      <path
        fill="currentColor"
        d="M2 2h20v20l-3.333-2.752L15.333 22 12 19.248 8.667 22l-3.334-2.752L2 22z"
      />
      <path fill="#00CEE6" d="M2 2v20L22 2z" />
      <path
        d="M2.5 2.5v18.439l2.515-2.077a.5.5 0 0 1 .636 0l3.016 2.49 3.015-2.49a.5.5 0 0 1 .636 0l3.015 2.49 3.016-2.49a.5.5 0 0 1 .636 0L21.5 20.94V2.5h-19zm-.182 19.886A.5.5 0 0 1 1.5 22V2a.5.5 0 0 1 .5-.5h20a.5.5 0 0 1 .5.5v20a.5.5 0 0 1-.818.386l-3.015-2.49-3.016 2.49a.5.5 0 0 1-.636 0L12 19.896l-3.015 2.49a.5.5 0 0 1-.636 0l-3.016-2.49-3.015 2.49z"
        fill="#0D3578"
        fillRule="nonzero"
      />
      <path
        d="M7 7.5a.5.5 0 0 1 0-1h10a.5.5 0 1 1 0 1H7zM7 11.5a.5.5 0 1 1 0-1h10a.5.5 0 1 1 0 1H7zM7 15.5a.5.5 0 1 1 0-1h5a.5.5 0 1 1 0 1H7z"
        fill="#0D3578"
        fillRule="nonzero"
      />
    </g>
  </svg>
)

export default SvgOrdersActive
