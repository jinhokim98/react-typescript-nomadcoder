import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useRecoilValue } from 'recoil'
import isDarkAtom from './atoms'
import GlobalStyle from './style/globalStyle'
import Router from './Router'
import { darkTheme, lightTheme } from './style/theme'

function App() {
  const isDark = useRecoilValue(isDarkAtom)
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  )
}

export default App
