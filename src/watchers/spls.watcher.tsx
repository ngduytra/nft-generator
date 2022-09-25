// import { Fragment, useCallback, useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { useWalletAddress } from '@sentre/senhub'
// import { PublicKey } from '@solana/web3.js'

// import { initSPLs } from 'model/spl.controller'
// import { GLOBAL_WATCHER, useWatcherLoading } from 'watchers'
// import { getParsedTokensbyUser, notifyError } from 'helper'
// import configs from 'configs'

// // const {
// //   sol: { connection },
// // } = configs

// // TODO: Config
// const NAME = 'spl'

// const SPLsWatcher = () => {
//   const [loadingInfo, setLoadingInfo] = useWatcherLoading()
//   // const [watchId, setWatchId] = useState(0)
//   const dispatch = useDispatch()
//   const walletAddress = useWalletAddress()
//   console.log('Started:')

//   // TODO: init all account data
//   const init = useCallback((data) => dispatch(initSPLs(data)), [dispatch])
//   // TODO: upset account data

//   const fetchData = useCallback(async () => {
//     if (GLOBAL_WATCHER[NAME] !== undefined) return
//     try {
//       GLOBAL_WATCHER[NAME] = true
//       console.log('chay vo day')
//       setLoadingInfo({ ...GLOBAL_WATCHER, [NAME]: true })
//       console.log('before fetch: ', walletAddress)
//       const splAddresses = await getParsedTokensbyUser({
//         publicAddress: walletAddress,
//       })
//       console.log('splAddresses: ', splAddresses)
//       init(splAddresses)
//     } catch (error) {
//       notifyError(error)
//     } finally {
//       setLoadingInfo({ ...loadingInfo, [NAME]: false })
//     }
//   }, [init, loadingInfo, setLoadingInfo, walletAddress])

//   // const watchData = useCallback(async () => {
//   //   if (watchId) return
//   //   const newWatcherId = connection.onAccountChange(
//   //     new PublicKey(walletAddress),
//   //     async (info) => {
//   //       // console.log(' token info from watcher: ', info)
//   //       // fetchData()
//   //     },
//   //   )
//   //   setWatchId(newWatcherId)
//   // }, [walletAddress, watchId])

//   useEffect(() => {
//     fetchData()
//   }, [fetchData])

//   // useEffect(() => {
//   //   watchData()
//   //   return () => {
//   //     ;(async () => {
//   //       if (!watchId) return
//   //       await connection.removeAccountChangeListener(watchId)
//   //       setWatchId(0)
//   //     })()
//   //   }
//   // }, [watchData, watchId])

//   return <Fragment />
// }
// export default SPLsWatcher
