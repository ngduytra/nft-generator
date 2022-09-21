import { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useWalletAddress } from '@sentre/senhub/dist'
import { PublicKey } from '@solana/web3.js'

import { initNFTs } from 'model/nfts.controller'
import { GLOBAL_WATCHER, useWatcherLoading } from 'watchers'
import { useMetaplex } from 'hooks/useMetaplex'
import { notifyError } from 'helper'
import configs from 'configs'

const {
  sol: { connection },
} = configs

// TODO: Config
const NAME = 'nft'

const NFTsWatcher = () => {
  const [loadingInfo, setLoadingInfo] = useWatcherLoading()
  const [watchId, setWatchId] = useState(0)
  const dispatch = useDispatch()
  const metaplex = useMetaplex()
  const walletAddress = useWalletAddress()

  // TODO: init all account data
  const init = useCallback((data) => dispatch(initNFTs(data)), [dispatch])
  // TODO: upset account data

  const fetchData = useCallback(async () => {
    if (GLOBAL_WATCHER[NAME] !== undefined || !metaplex) return
    try {
      GLOBAL_WATCHER[NAME] = true
      setLoadingInfo({ ...GLOBAL_WATCHER, [NAME]: true })
      const nfts = await metaplex.findAllByCreator(new PublicKey(walletAddress))
      console.log('nfts fetched:', nfts)
      init(nfts)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoadingInfo({ ...loadingInfo, [NAME]: false })
    }
  }, [init, loadingInfo, metaplex, setLoadingInfo, walletAddress])

  const watchData = useCallback(async () => {
    if (watchId) return
    const newWatcherId = connection.onAccountChange(
      new PublicKey(walletAddress),
      async (info) => {
        fetchData()
      },
    )
    setWatchId(newWatcherId)
  }, [fetchData, walletAddress, watchId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    watchData()
    return () => {
      ;(async () => {
        if (!watchId) return
        await connection.removeAccountChangeListener(watchId)
        setWatchId(0)
      })()
    }
  }, [watchData, watchId])

  return <Fragment />
}
export default NFTsWatcher
