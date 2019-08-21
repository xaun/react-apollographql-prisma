import Link from 'next/link'

const Nav = () => (
  <div>
    <Link href="/">
      <a>
        <p>Home</p>
      </a>
    </Link>
    <Link href="/about">
      <a>
        <p>About</p>
      </a>
    </Link>
  </div>
)

export default Nav
