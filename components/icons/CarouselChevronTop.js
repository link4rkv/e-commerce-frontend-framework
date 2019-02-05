import React from 'react'

const CarouselChervonTop = ({ title }) => (
  <svg width="60" height="60" viewBox="0 0 60 60">
    <title>{title}</title>
    <defs>
      <circle id="b" cx="20" cy="20" r="20" />
      <filter
        id="a"
        width="187.5%"
        height="187.5%"
        x="-43.8%"
        y="-31.2%"
        filterUnits="objectBoundingBox"
      >
        <feOffset dy="5" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
          stdDeviation="5"
        />
        <feComposite
          in="shadowBlurOuter1"
          in2="SourceAlpha"
          operator="out"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          in="shadowBlurOuter1"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
      </filter>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g opacity="0.8" transform="translate(10 5)">
        <use fill="#000" filter="url(#a)" xlinkHref="#b" />
        <circle
          cx="20"
          cy="20"
          r="19.5"
          fill="#FFF"
          stroke="#EAEAEA"
          strokeLinejoin="square"
        />
      </g>
      <path
        d="M35.333 24L30 18.667 24.667 24M35.333 30L30 24.667 24.667 30"
        stroke="#1557BF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </g>
  </svg>
)

export default CarouselChervonTop
