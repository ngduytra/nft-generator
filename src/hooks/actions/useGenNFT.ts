import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'
import { PublicKey } from '@solana/web3.js'

import { notifyError, notifySuccess } from 'helper'
import { useMetaplex } from '../useMetaplex'
import { AppState } from 'model'

export const useGenNFT = () => {
  const {
    name,
    symbol,
    description,
    sellerFeeBasisPoints,
    image,
    externalUrl,
    attributes,
    collectionInfo,
    files,
    creators,
    isCollection,
    hasImageLink,
    imageLink,
  } = useSelector((state: AppState) => state.nftSetup)
  const [loading, setLoading] = useState(false)
  const nftMachine = useMetaplex()

  const genNFT = useCallback(async () => {
    setLoading(true)
    try {
      if (!nftMachine) return

      const creatorAdapt = creators.map((val: any) => {
        if (util.isAddress(val.address))
          return notifyError('Please, check your creator address!')
        return { ...val, address: new PublicKey(val.address) }
      })

      const uri = await nftMachine.uploadMetadata({
        name,
        symbol,
        description,
        seller_fee_basis_points: sellerFeeBasisPoints,
        image: hasImageLink ? imageLink : image,
        external_url: externalUrl,
        attributes,
        collection: {
          name: collectionInfo.name,
          family: collectionInfo.family,
        },
        properties: {
          files,
          creators,
        },
      })
      if (isCollection) {
        await nftMachine.createNFT({
          uri,
          symbol,
          name,
          sellerFeeBasisPoints,
          isCollection,
          creators: creatorAdapt,
        })

        return notifySuccess(`Create collection ${name} NFT `, '')
      }
      if (!util.isAddress(collectionInfo?.address as string)) {
        await nftMachine.createNFT({
          uri,
          symbol,
          name,
          sellerFeeBasisPoints,
          creators: creatorAdapt,
        })
        return notifySuccess(`Create ${name} NFT `, '')
      }

      await nftMachine.createNFT({
        uri,
        symbol,
        name,
        sellerFeeBasisPoints,
        collection: new PublicKey(`${collectionInfo?.address}`),
      })

      notifySuccess(`Create ${name} NFT`, '')
    } catch (err) {
      notifyError(err)
    } finally {
      setLoading(false)
    }
  }, [
    attributes,
    collectionInfo,
    creators,
    description,
    externalUrl,
    files,
    hasImageLink,
    image,
    imageLink,
    isCollection,
    name,
    nftMachine,
    sellerFeeBasisPoints,
    symbol,
  ])

  return { genNFT, loading }
}
