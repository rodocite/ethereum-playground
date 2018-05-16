import Link from 'next/link'

export default () => (
  <div>
    <h1>Ethereum Playground</h1>
    <ul>
      <li><Link href="/dashboard"><a>Dashboard</a></Link></li>
      <li><Link href="/hackerwatch"><a>Hacker Watcher</a></Link></li>
      <li><Link href="/web3query"><a>Transactions from Address - Web3</a></Link></li>
      <li><Link href="/tracequery"><a>Transactions from Address - Parity Trace</a></Link></li>
      <li><Link href="/artsy"><a>Blockchain Art</a></Link></li>
      <li><Link href="/explorer"><a>Explorer</a></Link></li>
    </ul>
  </div>
)