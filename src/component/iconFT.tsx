import React, { useCallback, useEffect, useState } from 'react'
import { tokenProvider } from '@sentre/senhub'
import { TokenInfo } from '@solana/spl-token-registry'

import { Image } from 'antd'

import Dummy from '../static/images/dummy.png'

type IconFTProps = {
  address: string
}
const IconFT = ({ address }: IconFTProps) => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | undefined>()

  const getTokenInfo = useCallback(async () => {
    const token = await tokenProvider.findByAddress(address)
    setTokenInfo(token)
  }, [address])

  useEffect(() => {
    getTokenInfo()
    return () => {
      setTokenInfo(undefined)
    }
  }, [getTokenInfo])

  if (!tokenInfo || !tokenInfo?.logoURI)
    return (
      <Image
        src={Dummy}
        preview={false}
        style={{ borderRadius: 12, aspectRatio: '1' }}
      />
    )

  return (
    <Image
      src={tokenInfo.logoURI}
      preview={false}
      style={{ borderRadius: 12, aspectRatio: '1' }}
    />
  )
}

export default IconFT
