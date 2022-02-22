import '../styles/globals.css'
import Link from 'next/link'
import { ChainId, DAppProvider } from "@usedapp/core";

const config = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Rinkeby]: 'https://rinkeby.infura.io/v3/e7a1842fdeeb4afca5bf7f6d9535a9c9',
  },
}

function MyApp({ Component, pageProps }) {
  return (

    <DAppProvider config={config}>
      <div>
        <nav className="border-b p-6">
          <p className="text-4xl font-bold text-green-500">Green Aadhaar Chain</p>
          <div className="flex mt-4">
            <Link href="/">
              <a className="mr-4 text-blue-500">
                Home
              </a>
            </Link>
            <Link href="/viewPeers">
              <a className="mr-6 text-blue-500">
                View Peers
              </a>
            </Link>
            <Link href="/codeTable">
              <a className="mr-6 text-blue-500">
                View Transfer Codes
              </a>
            </Link>
          </div>
        </nav>
        <Component {...pageProps} />
      </div>
    </DAppProvider>

  )
}

export default MyApp

