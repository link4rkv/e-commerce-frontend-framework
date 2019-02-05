import React from 'react'
import styled from 'styled-components'
import { renderMenu } from './CategoriesDetails'
import Expand from '../icons/Expand'
import Collapse from '../icons/Collapse'
import isEmpty from 'lodash/isEmpty'
import Link from 'next/link'

const StyledLi = styled.li`
  position: relative;
`
const ItemLink = styled.a`
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.43;
  color: #1557bf;
  text-decoration: none;
  margin-bottom: 1.125rem;
  display: block;
`

const StyledSpan = styled.span`
  margin-bottom: 1.25rem;
  color: #333333;
  display: block;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.43;
`

const ShowMoreArrow = styled(Expand)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #1557bf;
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
`
const StyledCollabse = styled(Collapse)`
  position: absolute;
  right: 0;
  top: 0;
  color: #1557bf;
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
`

class RenderMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showMore: false,
    }

    this.handleShowMoreProductList = this.handleShowMoreProductList.bind(this)
  }

  handleShowMoreProductList(e) {
    e.stopPropagation()
    this.setState(prevState => {
      return {
        showMore: !prevState.showMore,
      }
    })
  }

  customListItem(subCategories, name, slug) {
    if (!isEmpty(subCategories)) {
      return <StyledSpan>{name}</StyledSpan>
    } else {
      return (
        <Link href={'/category/' + slug} passHref>
          <ItemLink>{name}</ItemLink>
        </Link>
      )
    }
  }

  render() {
    const { item } = this.props
    if (!item) {
      return null
    }

    return (
      <StyledLi onClick={this.handleShowMoreProductList}>
        {this.customListItem(item.subCategories, item.name, item.slug)}
        {this.state.showMore &&
          item.subCategories &&
          renderMenu(item.subCategories, item.name, item.slug)}
        {!isEmpty(item.subCategories) &&
          (!this.state.showMore ? <ShowMoreArrow /> : <StyledCollabse />)}
      </StyledLi>
    )
  }
}

export default RenderMenu
