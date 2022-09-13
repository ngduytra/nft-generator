import { util } from '@sentre/senhub'
import { Cluster } from '@solana/web3.js'

export const clusterAdapter = (net: string): Cluster => {
  console.log('network:', net)
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
