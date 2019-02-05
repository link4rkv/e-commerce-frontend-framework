import React from 'react'
import styled from 'styled-components'
import DroppedProduct from '../DroppedProduct/DroppedProduct'
import { CartConsumer } from '../CartProvider/CartProvider'
import { from } from '../../lib/Media'
import Popup from '../Popup/Popup'
import Text from '../Text/Text'

const StyledDroppedProducts = styled.div`
  width: 20.5rem;
  max-height: 36.125rem;
  border-radius: 0.5rem;
  padding: 2.5rem 1rem 1.625rem 1rem;
  background-color: white;
  margin: 2rem auto;

  ${from('tablet')} {
    width: 44rem;
    padding: 2.5rem 2.6rem 1.625rem 2.6rem;
    margin: 2.25rem auto;
  }
`

const StyledDroppedProductsContainer = styled.div`
  background-color: white;
  margin-bottom: 1.5rem;
  overflow-y: auto;
  max-height: 18.75rem;
  scrollbar-width: 0;

  &::-webkit-scrollbar {
    display: none;
  }

  ${from('tablet')} {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    margin: 0 0.31rem 2.5rem 0.31rem;
  }
`

const DroppedProductWrp = styled.div`
  ${from('tablet')} {
    width: 18.5rem;
    display: inline-block;
  }
`

const ButtonWrp = styled.div`
  text-align: center;

  ${from('tablet')} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const Button = styled.button`
  border-radius: 1.125rem;
  width: 17.875rem;
  cursor: pointer;
  border: 1px solid #1557c0;
  background-color: #ffffff;
  padding: 0.5rem;
  margin: 0 auto;

  ${from('tablet')} {
    margin: 0;
  }

  &:focus {
    outline: none;
  }
`

const ButtonBlue = styled(Button)`
  background-color: #1557bf;
  border: none;
  margin: 0 auto 1rem auto;

  ${from('tablet')} {
    margin: 0;
    order: 1;
  }
`

const StyleText = styled(Text)`
  width: 15.875rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;

  ${from('tablet')} {
    margin-bottom: 2.75rem;
    width: unset;
  }
`

class DroppedProductsPopup extends React.Component {
  render() {
    const { onClose, onUpdate } = this.props

    return (
      <CartConsumer>
        {({ items, countOf }) =>
          Object.keys(items).length ? (
            <Popup onClose={onClose}>
              <StyledDroppedProducts>
                <Text
                  as="h3"
                  size="xl"
                  weight="bold"
                  color="#333333"
                  align="center"
                >
                  Oops! Items will be dropped off
                </Text>
                <StyleText
                  as="h5"
                  size="medium"
                  color="#333333"
                  weight="regular"
                  align="center"
                >
                  To proceed with a different postal code, the following items
                  will be dropped off.
                </StyleText>
                <StyledDroppedProductsContainer>
                  {Object.keys(items).map(key => {
                    return (
                      <DroppedProductWrp key={items[key].id}>
                        <DroppedProduct
                          details={items[key]}
                          itemCount={countOf(items[key])}
                        />
                      </DroppedProductWrp>
                    )
                  })}
                </StyledDroppedProductsContainer>
                <ButtonWrp>
                  <ButtonBlue onClick={onUpdate}>
                    <Text
                      size="medium"
                      color="#ffffff"
                      weight="bold"
                      align="center"
                    >
                      Proceed and drop off items
                    </Text>
                  </ButtonBlue>
                  <Button onClick={onClose}>
                    <Text
                      size="medium"
                      color="#1557bf"
                      weight="bold"
                      align="center"
                    >
                      Cancel
                    </Text>
                  </Button>
                </ButtonWrp>
              </StyledDroppedProducts>
            </Popup>
          ) : null
        }
      </CartConsumer>
    )
  }
}

export default DroppedProductsPopup
