import { AppProps } from 'next/app'
import * as React from 'react'
import withApolloClient, { IApolloProps } from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from '../lib/theme'
import { reset } from '../lib/reset'

type GlobalProps = {
  lightTheme?: boolean
}

const GlobalStyle = createGlobalStyle<GlobalProps>`
  ${reset}
  body {
    color: ${props => (props.lightTheme ? 'black' : 'white')};
    background-color: ${props => (props.lightTheme ? 'white' : 'black')};
    font-family: ${theme.fonts.primaryFont};
  }
`

class MyApp extends React.Component<IApolloProps & AppProps> {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle lightTheme />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

export default withApolloClient(MyApp)
