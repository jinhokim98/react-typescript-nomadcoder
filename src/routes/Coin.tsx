import React from 'react'
import { Route, Routes, useLocation, useParams, Link, useMatch } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchCoinInfo, fetchCoinTickers } from '../api'
import * as CS from './styles/CoinStyle'
import Chart from './Chart'
import Price from './Price'

interface Params {
  coinId: string
}

interface RouteState {
  name: string
}
interface InfoData {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
  description: string
  message: string
  open_source: boolean
  started_at: string
  development_status: string
  hardware_wallet: boolean
  proof_type: string
  org_structure: string
  hash_algorithm: string
  first_data_at: string
  last_data_at: string
}

interface PriceData {
  id: string
  name: string
  symbol: string
  rank: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  beta_value: number
  first_data_at: string
  last_updated: string
  quotes: {
    USD: {
      ath_date: string
      ath_price: number
      market_cap: number
      market_cap_change_24h: number
      percent_change_1h: number
      percent_change_1y: number
      percent_change_6h: number
      percent_change_7d: number
      percent_change_12h: number
      percent_change_15m: number
      percent_change_24h: number
      percent_change_30d: number
      percent_change_30m: number
      percent_from_price_ath: number
      price: number
      volume_24h: number
      volume_24h_change_24h: number
    }
  }
}
function Coin() {
  const { coinId } = useParams() as unknown as Params
  const location = useLocation() // window location 정보를 얻어옴
  const state = location.state as RouteState

  // const { data: info, loading } = useFetch<InfoData>(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  // const { data: priceInfo } = useFetch<PriceData>(`https://api.coinpaprika.com/v1/tickers/${coinId}`)

  // key의 경우 아래와 같이 해결
  const { isLoading: infoLoading, data: info } = useQuery<InfoData>(['info', coinId], () => fetchCoinInfo(coinId), {
    refetchInterval: 5000,
  }) // 5초마다 refetch를 줄 수도 있다. 주기적으로 앱을 업데이트 시킴
  const { isLoading: tickersLoading, data: priceInfo } = useQuery<PriceData>(['tickers', coinId], () =>
    fetchCoinTickers(coinId),
  )

  const priceMatch = useMatch('/:coinId/price')
  const chartMatch = useMatch('/:coinId/chart')

  const loading = infoLoading || tickersLoading

  // eslint-disable-next-line no-nested-ternary
  const title = state?.name ? state.name : loading ? 'Loading..' : info?.name

  return (
    <CS.Container>
      <CS.Header>
        <CS.Title>{title}</CS.Title>
      </CS.Header>
      {loading ? (
        <CS.Loader>Loading...</CS.Loader>
      ) : (
        <>
          <CS.Overview>
            <CS.OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </CS.OverviewItem>
            <CS.OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </CS.OverviewItem>
            <CS.OverviewItem>
              <span>Price:</span>
              <span>${priceInfo?.quotes.USD.price.toFixed(3)}</span>
            </CS.OverviewItem>
          </CS.Overview>
          <CS.Description>{info?.description}</CS.Description>
          <CS.Overview>
            <CS.OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </CS.OverviewItem>
            <CS.OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </CS.OverviewItem>
          </CS.Overview>

          <CS.Tabs>
            <CS.Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </CS.Tab>
            <CS.Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </CS.Tab>
          </CS.Tabs>

          <Routes>
            <Route path="chart" element={<Chart coinId={coinId} />} />
            <Route path="price" element={<Price />} />
          </Routes>
        </>
      )}
    </CS.Container>
  )
}

export default Coin
