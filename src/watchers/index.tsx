import { Fragment, useMemo } from 'react'
import { createGlobalState } from 'react-use'

import Loading from '../component/loading'
import NFTsWatcher from './nfts.watcher'
// import SPLsWatcher from './spls.watcher'

export const GLOBAL_WATCHER: Record<string, boolean> = {}
export const useWatcherLoading = createGlobalState<Record<string, boolean>>({})

export const AppWatcher: React.FC = ({ children }) => {
  const [loadingInfo] = useWatcherLoading()

  const loading = useMemo(
    () =>
      !Object.values(loadingInfo).length ||
      Object.values(loadingInfo).includes(true),
    [loadingInfo],
  )

  return (
    <Fragment>
      <NFTsWatcher />
      {loading ? <Loading /> : children}
    </Fragment>
  )
}
