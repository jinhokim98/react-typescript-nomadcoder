import styled from 'styled-components'

export const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`

export const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`

export const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CoinsList = styled.ul``

export const Coin = styled.li`
  display: flex;
  align-items: center;

  margin-bottom: 10px;
  padding: 20px;

  background-color: white;
  border-radius: 15px;
  color: ${(props) => props.theme.textColor};

  a {
    transition: color 0.2s ease-in;
    display: block;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`

export const Loader = styled.span`
  text-align: center;
  display: block;
`

export const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`
