import {
  bundlrStorage,
  CreateNftInput,
  Metadata,
  Metaplex,
  NftWithToken,
  UploadMetadataInput,
  walletAdapterIdentity,
} from '@metaplex-foundation/js'
import { util } from '@sentre/senhub'
import { Connection, clusterApiUrl, Cluster, PublicKey } from '@solana/web3.js'

import { ConcreteMetaplexAdapter } from './walletMetaplexAdapter'

const DEFAULT_RPC_ENDPOINT = 'mainnet-beta'
const wallet = window.sentre.wallet

class MetaplexNFT {
  public static instance: MetaplexNFT
  private _metaplex: Metaplex

  constructor(metaplex: Metaplex) {
    this._metaplex = metaplex
  }

  static async initializeMetaplex(rpcEndpoint: Cluster = DEFAULT_RPC_ENDPOINT) {
    const connection = new Connection(clusterApiUrl('devnet'))

    if (!MetaplexNFT.instance) {
      const newMetaplex = Metaplex.make(connection)
        .use(
          walletAdapterIdentity(
            await ConcreteMetaplexAdapter.createPublicKey(wallet),
          ),
        )
        .use(
          bundlrStorage({
            address: 'https://devnet.bundlr.network',
            providerUrl: 'https://api.devnet.solana.com',
            timeout: 60000,
          }),
        )

      MetaplexNFT.instance = new MetaplexNFT(newMetaplex)
    }
    return MetaplexNFT.instance
  }

  createNFT = async (input: CreateNftInput): Promise<NftWithToken> => {
    const { nft } = await this._metaplex.nfts().create(input).run()
    return nft
  }

  findAllNftsByOwner = async (ownerAddress: string) => {
    if (!util.isAddress(ownerAddress)) throw new Error('Invalid address!')
    const arrayNFTs = await this._metaplex
      .nfts()
      .findAllByOwner({ owner: this._metaplex.identity().publicKey })
      .run()
    return arrayNFTs
  }

  findByMint = async (nftAddress: PublicKey) => {
    const nftInfo = await this._metaplex
      .nfts()
      .findByMint({ mintAddress: nftAddress })
      .run()
    return nftInfo
  }

  findAllByMintList = async (mintAddresses: PublicKey[]) => {
    const nftInfo = await this._metaplex
      .nfts()
      .findAllByMintList({ mints: mintAddresses })
      .run()
    return nftInfo
  }

  // Get nft information include metadata
  load = async (metadata: Metadata) => {
    return await this._metaplex.nfts().load({ metadata }).run()
  }

  findAllByCreator = async (creator: PublicKey) => {
    const nftList = await this._metaplex
      .nfts()
      .findAllByCreator({ creator })
      .run()
    return nftList
  }

  uploadMetadata = async (data: UploadMetadataInput) => {
    const { uri } = await this._metaplex.nfts().uploadMetadata(data).run()
    return uri
  }

  printNewEdition = async (originalMint: PublicKey) => {
    const { nft: printedNft } = await this._metaplex
      .nfts()
      .printNewEdition({ originalMint })
      .run()
    return printedNft
  }

  getCost = async (file: any) => {
    const price = (
      await this._metaplex.storage().getUploadPriceForFile(file)
    ).basisPoints.toString(10)
    return price
  }
}

export default MetaplexNFT
