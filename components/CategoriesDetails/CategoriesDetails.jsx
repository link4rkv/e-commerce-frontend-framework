import React from 'react'
import styled from 'styled-components'
import RenderMenu from './RenderMenu'
import Link from 'next/link'

import { from } from '../../lib/Media'

const StyledContainer = styled.li`
  display: ${({ selected }) => (selected ? 'block' : 'none')};
  background-color: white;
  grid-column: 1/4;
  grid-row: ${({ index }) => parseInt(index / 3 + 2, 10)};

  ${from('tablet')} {
    grid-column: 1/7;
    grid-row: ${({ index }) => parseInt(index / 6 + 2, 10)};
  }

  ${from('desktop')} {
    display: none;
  }
`

const StyledCategoriesDetails = styled.ul`
  border-radius: 4px;
  padding: 1.125rem 0.5rem 0 1.5rem;
  list-style: none;

  & & {
    padding: 0 0 0 1.5rem;
  }

  ${from('tablet')} {
    padding: 1.25rem 1.25rem 0 1.25rem;
  }

  ${from('desktop')} {
    display: none;
  }
`

const LinkToAllProducts = styled.a`
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.43;
  color: #1557bf;
  text-decoration: none;
  display: block;
  padding: 1.25rem 1.5rem 0;
`
const LinkToParentCategory = styled(LinkToAllProducts)`
  padding: 0;
  margin-bottom: 1.125rem;
`
export function renderMenu(subCategories, name, slug) {
  const handleClick = e => {
    e.stopPropagation()
  }

  return (
    <StyledCategoriesDetails>
      {name && slug && (
        <li>
          <Link href={'/category/' + slug} passHref>
            <LinkToParentCategory onClick={handleClick}>
              View all {name}
            </LinkToParentCategory>
          </Link>
        </li>
      )}
      {subCategories && subCategories.map(renderMenuItem)}
    </StyledCategoriesDetails>
  )
}

function renderMenuItem(item, key) {
  return <RenderMenu item={item} key={key} />
}

const CategoriesDetails = props => {
  let { selected, index } = props
  let { subCategories, name, slug } = props.subCategories
  if (!name) {
    return null
  }
  return (
    <StyledContainer
      selected={selected}
      index={index}
      data-testid="category-menu"
    >
      {slug && (
        <LinkToAllProducts href={'/category/' + slug}>
          View all {name}
        </LinkToAllProducts>
      )}
      {renderMenu(subCategories)}
    </StyledContainer>
  )
}

export default CategoriesDetails
