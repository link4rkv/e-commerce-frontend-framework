import React from 'react'
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'

import getConfig from 'next/config'

import Layout from '../../components/Layout'
import CategoryContainerList from '../../components/CategoryContainerList/CategoryContainerList'
import CategoryCollection from '../../components/CategoryCollection/CategoryCollection'
import { from } from '../../lib/Media'
import { dataCategory } from '../../mocks'
import Link from 'next/link'
import Text from '../../components/Text/Text'

const ChangeButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  ${from('tablet')} {
    margin-bottom: 2rem;
  }

  ${from('desktop')} {
    margin-bottom: 1rem;
  }
`
const ButtonHeading = styled.div`
  letter-spacing: 1px;
  color: #696969;
`

const Buttons = styled.div`
  display: flex;
  margin-top: 0.5rem;
`
const CategoryButton = styled.div`
  height: 2.25rem;
  line-height: 2.25rem;
  padding: 0 1rem;
  color: #fff;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: #1557bf;
`
const BrandButton = styled.div`
  height: 2.25rem;
  line-height: 2.25rem;
  padding: 0 1rem;
  color: #1557bf;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: #fff;
`

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

class Categories extends React.Component {
  static async getInitialProps() {
    const URL = '/category?paginated=false&paginate=false'
    const category = await (await fetch(`${API_URL + URL}`)).json()
    return { category }
  }

  constructor(props) {
    super(props)
    this.handleSelectSubCategory = this.handleSelectSubCategory.bind(this)
  }

  handleSelectSubCategory(category) {
    this.setState({ selectedSubCategory: category })
  }

  render() {
    const categoryCollection = this.props.category.data
    const { organizationData } = this.props
    return (
      <Layout organizationData={organizationData} hideCheckoutAddress>
        <ChangeButton>
          <ButtonHeading>
            <Text size="small">BROWSE BY</Text>
          </ButtonHeading>
          <Buttons>
            <CategoryButton>
              <Text size="medium" weight="bold">
                Category
              </Text>
            </CategoryButton>
            <Link href="/brands">
              <BrandButton>
                <Text size="medium">Brand</Text>
              </BrandButton>
            </Link>
          </Buttons>
        </ChangeButton>
        <CategoryCollection
          data={dataCategory}
          config={{ layoutType: 'SCROLLER' }}
        />
        <CategoryContainerList
          onClick={this.handleSelectSubCategory}
          data={categoryCollection}
        />
      </Layout>
    )
  }
}

export default Categories
