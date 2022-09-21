import { DataLoader, util } from '@sentre/senhub'
import { Cluster, PublicKey } from '@solana/web3.js'
import { message } from 'antd'
import { RcFile } from 'antd/lib/upload/interface'

import configs from 'configs'
import { TOKEN_PROGRAM } from 'constant'

const {
  sol: { connection },
} = configs

export const clusterAdapter = (net: string): Cluster => {
  if (net === 'devnet') return 'devnet'
  if (net === 'testnet') return 'testnet'
  return 'mainnet-beta'
}

export const notifySuccess = (content: string, txId: string) => {
  return window.notify({
    type: 'success',
    description: `${content} successfully. Click to view details.`,
    onClick: () => window.open(util.explorer(txId), '_blank'),
  })
}

export const notifyError = (er: any) => {
  console.log('er', er)
  return window.notify({
    type: 'error',
    description: er.message,
  })
}

export const fileToBase64 = (
  file: File,
  callBack: (result: string | ArrayBuffer | null) => void,
) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = async () => {
    if (reader.result) callBack(reader.result)
  }
}

export const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

export const fetchMetadata = async (url: string) => {
  return DataLoader.load('fetchMetadata' + url, () =>
    fetch(url).then((val) => val.json()),
  )
}

export const getParsedTokensbyUser = async ({
  publicAddress,
  limit = 5000,
}: {
  publicAddress: string
  limit?: number
}) => {
  // Get all accounts owned by user
  // and created by SPL Token Program
  // this will include all NFTs, Coins, Tokens, etc.
  const { value: splAccounts } = await connection.getParsedTokenAccountsByOwner(
    new PublicKey(publicAddress),
    {
      programId: new PublicKey(TOKEN_PROGRAM),
    },
  )

  // Assume that tokens is SPL token with decimals !== 0 and amount !==0
  // At this point we filter out other SPL tokens, like NFT e.g.
  const nftAccounts = splAccounts
    .filter((t) => {
      const amount = t.account?.data?.parsed?.info?.tokenAmount?.uiAmount
      const decimals = t.account?.data?.parsed?.info?.tokenAmount?.decimals
      return decimals !== 0 && amount !== 0
    })
    .map((t) => {
      const address = t.account?.data?.parsed?.info?.mint
      return address
    })

  // if user have tons of tokens return first N
  const accountsSlice = nftAccounts?.slice(0, limit)

  return accountsSlice
}
