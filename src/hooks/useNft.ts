import { useCallback, useEffect, useState } from 'react'
import { net } from '@sentre/senhub'

import MetaplexNFT from 'lib/metaplex'
import { clusterAdapter } from 'helper'

export const useNft = () => {
  const [nftMachine, setNftMachine] = useState<MetaplexNFT>()
  const initializeNftMachine = useCallback(async () => {
    const newNftMachine = await MetaplexNFT.initializeMetaplex(
      clusterAdapter(net),
    )
    setNftMachine(newNftMachine)
  }, [])

  useEffect(() => {
    initializeNftMachine()
  }, [initializeNftMachine])

  return nftMachine
}
