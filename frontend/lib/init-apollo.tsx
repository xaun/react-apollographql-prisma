import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

let apolloClient = null

function create(initialState) {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  const isBrowser = typeof window !== 'undefined'

  return new ApolloClient({
    link: ApolloLink.from([
      errorLink,
      new HttpLink({
        uri: 'http://localhost:4000',
        credentials: 'same-origin',
        fetch: !isBrowser && fetch
      })
    ]),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
