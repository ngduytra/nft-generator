import { Net, rpc } from '@sentre/senhub'
import { Connection } from '@solana/web3.js'

/**
 * Contructor
 */
type Conf = {
  node: string
  connection: Connection
  bundlrConfig?: {
    address: string
    providerUrl: string
    timeout: number
  }
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    node: 'https://api.devnet.solana.com',
    connection: new Connection(rpc),
    bundlrConfig: {
      address: 'https://devnet.bundlr.network',
      providerUrl: 'https://api.devnet.solana.com',
      timeout: 60000,
    },
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: 'https://api.testnet.solana.com',
    connection: new Connection(rpc),
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: 'https://api.mainnet-beta.solana.com',
    connection: new Connection(rpc),
  },
}

/**
 * Module exports
 */
export default conf
