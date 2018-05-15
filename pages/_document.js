import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <meta name="viewport" content="width=device-width" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
        <Head>
          {this.props.styleTags}
          <style >{`
            body {
              margin: 20px;
            }
            html {
              box-sizing: border-box;
            }
            *, *:before, *:after {
              font-family: -apple-system, BlinkMacSystemFont, sans-serif;
              box-sizing: inherit;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}