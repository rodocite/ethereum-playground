import Link from 'next/link'

export default () => (
  <div>
    <h1>Ethereum Playground</h1>
    <ul>
      <li><Link href="/dashboard"><a>Dashboard</a></Link></li>
      <li><Link href="/hackerwatch"><a>Hacker Watcher</a></Link></li>
      <li><Link href="/addressDetails"><a>Inspect Address</a></Link></li>
      <li><Link href="/artsy"><a>Blockchain Art</a></Link></li>
      <li><Link href="/explorer"><a>Explorer</a></Link></li>
    </ul>
  </div>
)