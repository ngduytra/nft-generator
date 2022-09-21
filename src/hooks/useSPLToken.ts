import { useCallback, useEffect, useState } from 'react'
import { useWalletAddress } from '@sentre/senhub'

import { getParsedTokensbyUser, notifyError } from 'helper'

export const useSPLToken = () => {
  const [loading, setLoading] = useState(false)
  const [splTokens, setSplToken] = useState<string[]>([])

  const walletAddress = useWalletAddress()

  const getSPLTokens = useCallback(async () => {
    setLoading(true)
    try {
      const newSplTokens = await getParsedTokensbyUser({
        publicAddress: walletAddress,
      })

      return setSplToken(newSplTokens)
    } catch (err) {
      notifyError(err)
    } finally {
      setLoading(false)
    }
  }, [walletAddress])

  useEffect(() => {
    getSPLTokens()
  }, [getSPLTokens])

  return { splTokens, loading }
}
