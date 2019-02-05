import React from 'react'
import styled from 'styled-components'
import { from } from '../../lib/Media'

const ImageCard = styled.div`
  width: 20rem;
  height: 10rem;
  margin: 0 auto;
  display: flex;
  white-space: normal;
  background-color: white;
  overflow: hidden;

  ${from('tablet')} {
    width: 44rem;
    height: 22rem;
  }

  ${from('hd')} {
    width: 51.5rem;
    height: 29.5rem;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  > div {
    flex: 1;
  }
`
const Details = styled.div`
  position: relative;
  height: 100%;
  padding: 1.5rem 1rem 1rem 1.5rem;

  ${from('tablet')} {
    padding: 3rem 1rem 2rem 2.5rem;
  }

  h2 {
    font-size: 0.9rem;
    font-weight: 600;
    color: #333333;
    margin-bottom: 0.5rem;

    ${from('tablet')} {
      font-size: 1.5rem;
    }

    ${from('desktop')} {
      font-size: 1.44rem;
      line-height: 1.39;
    }
  }

  p {
    color: #777777;
    font-size: 0.95rem;
    line-height: 1;

    ${from('tablet')} {
      line-height: 1.6;
    }
  }
`
const ImageBox = styled.div`
  background-color: #696969;
  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  overflow: hidden;
`

const Button = styled.div`
  color: white;
  background: #1557bf;
  display: none;
  padding: 0.625rem 1.25rem;
  position: absolute;
  bottom: 3rem;
  left: 2.5rem;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;

  ${from('desktop')} {
    display: inline-block;
  }

  ${from('hd')} {
    bottom: 7rem;
  }
`
const ImageSlideShowCard = props => {
  const { imageUrl, title, text } = props.image

  return (
    <ImageCard>
      <div>
        <Details>
          <h2>{title}</h2>
          <p>{text}</p>
          <Button>Find out more</Button>
        </Details>
      </div>
      <div>
        <ImageBox image={imageUrl} data-testid="image" />
      </div>
    </ImageCard>
  )
}
export default ImageSlideShowCard
