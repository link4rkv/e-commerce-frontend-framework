import React from 'react'

const SvgAlert = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" {...props}>
    <title>{title}</title>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(1 1)">
        <path
          d="M5.854.745L.18 11.68a1.756 1.756 0 0 0-.004 1.54c.236.477.673.774 1.15.78h11.349c.476-.006.913-.303 1.15-.78a1.756 1.756 0 0 0-.005-1.54L8.146.745C7.903.282 7.468 0 7 0c-.468 0-.903.282-1.146.745z"
          fill="#DD0D42"
        />
        <circle fill="#FFF" cx={7} cy={11} r={1} />
      </g>
      <rect fill="#FFF" x={7} y={5} width={2} height={5} rx={1} />
    </g>
  </svg>
)

export default SvgAlert
