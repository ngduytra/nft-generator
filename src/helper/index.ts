import { util } from '@sentre/senhub'
import { Cluster } from '@solana/web3.js'
import { message } from 'antd'
import { RcFile } from 'antd/lib/upload/interface'

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
