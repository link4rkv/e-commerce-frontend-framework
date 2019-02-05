import React from 'react'
import styled from 'styled-components'
import { from } from '../../lib/Media'
import Layout from '../../components/Layout'
import Text from '../../components/Text'
import Profile from '../../components/Profile/Profile'
import Payment from '../../components/Payment/Payment'
import AddressCard from '../../components/Address/AddressCard'
import Preference from '../../components/Preference/Preference'
import { withAccount } from '../../components/AccountProvider'

const ChangeButton = styled.div`
  width: 100%;
`

const Main = styled.div`
  margin: 0 auto;
  max-width: 23.5rem;

  ${from('tablet')} {
    max-width: unset;
    width: fit-content;
  }
`

const Buttons = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-right: -1rem;

  ${from('tablet')} {
    margin-right: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: 0;
`
const Button = styled.button`
  border: none;
  outline: none;

  margin: 1rem 0.5rem 0 0;
  padding: 0.5rem 1rem;
  height: 2.25rem;
  text-align: center;
  border-radius: 0.25rem;
  background-color: ${props => (props.active ? '#1557bf' : '#ffffff')};
  cursor: pointer;
`

const StyledText = styled(Text)`
  color: ${props => (props.active ? '#ffffff' : '#1557bf')};
  font-weight: ${props => (props.active ? 'bold' : 'regular')};
`

class Accounts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'profile',
    }
    this.selectedComponent = this.selectedComponent.bind(this)
  }

  selectedComponent(compName) {
    this.setState({
      selected: compName,
    })
  }

  render() {
    const { selected } = this.state
    const { accountData } = this.props
    let mobile =
      accountData.phones &&
      accountData.phones.length &&
      accountData.phones[0].phone
    let email =
      accountData.emails &&
      accountData.emails.length &&
      accountData.emails[0].email
    let fullName = accountData.name && accountData.name.split(/ (.*)/)
    let first = fullName && fullName.length && fullName[0]
    let last = fullName && fullName.length && fullName[1]
    const profileData = {
      first,
      last,
      email,
      mobile,
    }
    return (
      <Layout hideCheckoutAddress>
        <Main>
          <ChangeButton>
            <Text size="xl" color="#333333" weight="bold">
              Account
            </Text>
            <Buttons>
              <Button
                active={selected === 'profile'}
                onClick={() => this.selectedComponent('profile')}
              >
                <StyledText size="medium" active={selected === 'profile'}>
                  Profile
                </StyledText>
              </Button>
              <Button
                active={selected === 'payment'}
                onClick={() => this.selectedComponent('payment')}
              >
                <StyledText
                  size="medium"
                  active={selected === 'payment'}
                  color="#1557bf"
                >
                  Payment
                </StyledText>
              </Button>
              <Button
                active={selected === 'address'}
                onClick={() => this.selectedComponent('address')}
              >
                <StyledText
                  size="medium"
                  active={selected === 'address'}
                  color="#1557bf"
                >
                  Address
                </StyledText>
              </Button>
              <Button
                active={selected === 'preference'}
                onClick={() => this.selectedComponent('preference')}
              >
                <StyledText
                  size="medium"
                  active={selected === 'preference'}
                  color="#1557bf"
                >
                  Preference
                </StyledText>
              </Button>
            </Buttons>
          </ChangeButton>
          {this.state.selected == 'profile' && (
            <Profile profile={profileData} />
          )}
          {this.state.selected == 'payment' && <Payment />}

          {this.state.selected == 'address' && (
            <AddressCard
              address={this.props.accountData}
              fetch={this.props.fetch}
            />
          )}
          {this.state.selected == 'preference' && <Preference />}
        </Main>
      </Layout>
    )
  }
}

export default withAccount(Accounts)
