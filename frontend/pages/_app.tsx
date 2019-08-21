import { AppProps } from 'next/app'
import * as React from 'react'
import withApolloClient, { IApolloProps } from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import theme from '../components/tokens/theme'

class MyApp extends React.Component<IApolloProps & AppProps> {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

export default withApolloClient(MyApp)
