import Link from 'next/link'

export default () => (
  <div>
    <ul>
      <li><Link href="/dashboard"><a>Dashboard</a></Link></li>
      <li><Link href="/hackerwatch"><a>Hacker Watcher</a></Link></li>
      <li><Link href="/addressDetails"><a>Inspect Address</a></Link></li>
    </ul>
  </div>
)