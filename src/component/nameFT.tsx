import React, { useCallback, useEffect, useState } from 'react'
import { tokenProvider } from '@sentre/senhub'
import { TokenInfo } from '@solana/spl-token-registry'

import { Typography } from 'antd'

type NameFTProps = {
  address: string
}
const NameFT = ({ address }: NameFTProps) => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | undefined>()

  const getTokenInfo = useCallback(async () => {
    const token = await tokenProvider.findByAddress(address)
    setTokenInfo(token)
  }, [address])

  useEffect(() => {
    getTokenInfo()
  }, [getTokenInfo])

  if (!tokenInfo || !tokenInfo?.name)
    return <Typography.Text ellipsis>Unknown Token</Typography.Text>

  return <Typography.Text ellipsis>{tokenInfo.name}</Typography.Text>
}

export default NameFT
