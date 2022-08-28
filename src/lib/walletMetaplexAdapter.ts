import { PublicKey, Transaction } from '@solana/web3.js'

export class ConcreteMetaplexAdapter {
  wallet: WalletInterface
  publicKey: PublicKey | null
  constructor(publicKey: PublicKey | null, wallet: WalletInterface) {
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
    console.log('messafge: ', message)
    // const newMessage = Array.from(message)
    //   .map((val) => val.toString(16).padStart(2, '0'))
    //   .join(' ')
    const newMessage = new TextDecoder().decode(message)
    console.log('new Message:', newMessage)
    const data: SignedMessage = await this.wallet.signMessage(newMessage)

    return new Uint8Array(Object.assign([], data.message))
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
