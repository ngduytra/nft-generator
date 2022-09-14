import { PublicKey, Transaction } from '@solana/web3.js'

export class ConcreteMetaplexAdapter {
  wallet: WalletInterface
  publicKey: PublicKey
  constructor(publicKey: PublicKey, wallet: WalletInterface) {
    this.publicKey = publicKey
    this.wallet = wallet
  }

  static async createPublicKey(wallet: WalletInterface) {
    const address = await wallet.getAddress()
    return new ConcreteMetaplexAdapter(new PublicKey(address), wallet)
  }

  public async signMessage(message: Uint8Array): Promise<Uint8Array> {
    if (this.wallet.signMessage === undefined) {
      throw new Error('signMessage')
    }

    const newMessage = new TextDecoder().decode(message)
    const data = await this.wallet.signMessage(newMessage)
    return Uint8Array.from(Buffer.from(data.signature, 'hex'))
  }

  public async signTransaction(transaction: Transaction): Promise<Transaction> {
    if (this.wallet.signTransaction === undefined) {
      throw new Error('signTransaction')
    }
    console.log('chay vao sign Transaction!', transaction)

    return this.wallet.signTransaction(transaction)
  }

  public async signAllTransactions(
    transactions: Transaction[],
  ): Promise<Transaction[]> {
    if (this.wallet.signAllTransactions === undefined) {
      throw new Error('signAllTransactions')
    }
    console.log('cgay vao signALlTransaction:')

    return this.wallet.signAllTransactions(transactions)
  }
}
