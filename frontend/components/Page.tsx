import Head from 'next/head'
import Nav from './Nav'

export default ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/static/favicon.png" />
    </Head>
    <Nav />
    {children}
    <footer>Footer</footer>
  </div>
)
