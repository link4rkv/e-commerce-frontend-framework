import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { from } from '../../lib/Media'

const ImageCard = styled.div`
  width: 44rem;
  height: 22rem;
  margin: 0 auto;
  display: flex;
  white-space: normal;
  background-color: white;
  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: cover;

  ${from('hd')} {
    width: 51.5rem;
    height: 29.5rem;
  }
`
const Details = styled.div`
  position: relative;
  height: 100%;
  width: 45%;
  padding: 3rem 1rem 0 2.5rem;
  overflow: hidden;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333333;
    line-height: 1.6;
  }

  p {
    color: #777777;
    font-size: 0.95rem;
    line-height: 1.6;
  }

  a {
    display: block;
  }
`

const Button = styled.div`
  color: white;
  background: #1557bf;
  display: inline-block;
  padding: 0.625rem 1.25rem;
  position: absolute;
  bottom: 3rem;
  left: 2.5rem;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;

  @media screen and (max-width: 29rem) {
    display: none;
  }

  ${from('hd')} {
    bottom: 7rem;
  }
`
const BannerWithButton = props => {
  const { imageUrl, title, text, link } = props.image

  return (
    <ImageCard image={imageUrl} data-testid="image">
      <Details>
        <h2>{title}</h2>
        <p>{text}</p>
        <Link href={link}>
          <a>
            <Button>Find out more</Button>
          </a>
        </Link>
      </Details>
    </ImageCard>
  )
}
export default BannerWithButton
