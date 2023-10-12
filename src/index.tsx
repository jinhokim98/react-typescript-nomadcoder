import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components'
import App from './App'
import { darkTheme } from './style/theme'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
