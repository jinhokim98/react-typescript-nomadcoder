import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'
import isDarkAtom from '../atoms'
import fetchAllCoins from '../api'
import * as C from './styles/CoinsStyle'

interface CoinInterface {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
}

function Coins() {
  // const { data: coins, loading } = useFetch<CoinInterface[]>('https://api.coinpaprika.com/v1/coins')
  const { isLoading, data: coins } = useQuery<CoinInterface[]>(['allCoins'], fetchAllCoins, {
    select: (item) => item.slice(0, 100),
  })

  const setIsDark = useSetRecoilState(isDarkAtom)

  return (
    <C.Container>
      <C.Header>
        <C.Title>코인</C.Title>
        <button onClick={() => setIsDark((prev) => !prev)}>Toggle mode</button>
      </C.Header>
      {isLoading ? (
        <C.Loader>Loading...</C.Loader>
      ) : (
        <C.CoinsList>
          {coins !== undefined &&
            coins.map((coin) => (
              <C.Coin key={coin.id}>
                <C.Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="coin" />
                <Link
                  to={`/${coin.id}`}
                  state={{
                    name: coin.name,
                  }}
                >
                  {coin.name} &rarr;
                </Link>
              </C.Coin>
            ))}
        </C.CoinsList>
      )}
    </C.Container>
  )
}

export default Coins
