import {AppProps, Container} from 'next/app';
import * as React from "react";
import withApolloClient, {IApolloProps} from '../lib/with-apollo-client'
import { ApolloProvider } from "react-apollo";

class MyApp extends React.Component<IApolloProps & AppProps> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);