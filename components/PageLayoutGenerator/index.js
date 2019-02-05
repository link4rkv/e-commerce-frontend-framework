import React, { Component } from 'react'
import Text from '../Text/Text'
import styled from 'styled-components'
import { components } from '../../pages/index'
import NoImg from '../icons/NoImg'

const StaticImageContainer = styled.div`
  min-height: 18.75rem;
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 100%;
`

const NoImgContainer = styled.div`
  padding: 5rem;
`

const StyledNoImg = styled(NoImg)`
  margin: 0 auto;
  display: block;
`

const StaticPageHeading = styled.div`
  margin: 2rem 0;
`

const LayoutStyle = styled.div`
  margin: 0 auto;
  padding: 1rem;
  width: 80%;
  max-width: 62rem;

  > div {
    margin: 1rem 0;
  }
`

class PageLayoutGenerator extends Component {
  constructor(props) {
    super(props)
  }

  getComponent(component) {
    return components[component]
  }

  renderComponent(name, data, index) {
    let Comp = this.getComponent(name)
    if (Comp) {
      return <Comp data={data} key={index} />
    }
  }

  render() {
    let layouts = []
    let imageUrl = `` /* Image Url for static Image Container */
    layouts =
      this.props.data &&
      this.props.data.map((item, index) => {
        return this.renderComponent(item.name, item.value, index)
      })
    return (
      <React.Fragment>
        {/*  Image url is missing  */}
        {imageUrl ? (
          <StaticImageContainer image={`${imageUrl}`} />
        ) : (
          <NoImgContainer>
            <StyledNoImg />
          </NoImgContainer>
        )}
        <LayoutStyle>
          {this.props.title && (
            <StaticPageHeading data-testid="StaticPageHeading">
              <Text size="xl" color="#333" weight="bold">
                {this.props.title}
              </Text>
            </StaticPageHeading>
          )}
          {layouts && layouts.length > 0 && (
            <div data-testid="LayoutContainer">{layouts} </div>
          )}
        </LayoutStyle>
      </React.Fragment>
    )
  }
}

export default PageLayoutGenerator
