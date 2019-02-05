import React from 'react'

const SvgSuccess = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" {...props}>
    <title>{title}</title>
    <g fill="none" fillRule="evenodd">
      <circle fill="#0B8043" cx={8} cy={8} r={8} />
      <path
        d="M10.304 5.282a1 1 0 1 1 1.392 1.436l-4.125 4a1 1 0 0 1-1.392 0L4.304 8.9a1 1 0 0 1 1.392-1.436l1.179 1.143 3.429-3.325z"
        fill="#FFF"
      />
    </g>
  </svg>
)

export default SvgSuccess
