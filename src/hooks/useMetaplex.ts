import { useCallback, useEffect, useState } from 'react'

import MetaplexNFT from 'lib/metaplex'

export const useMetaplex = () => {
  const [nftMachine, setNftMachine] = useState<MetaplexNFT>()
  const initializeNftMachine = useCallback(async () => {
    const newNftMachine = await MetaplexNFT.initializeMetaplex()
    setNftMachine(newNftMachine)
  }, [])

  useEffect(() => {
    initializeNftMachine()
  }, [initializeNftMachine])

  return nftMachine
}
