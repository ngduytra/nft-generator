import { PublicKey } from '@solana/web3.js'

export const HOME_TAB: Record<string, string> = {
  NFT: 'nft',
  TOKEN: 'token',
}

export const PROJECT_PUBLIC_KEY = new PublicKey(
  'DBHmm6zJP13cuVepfFwp8mXtNRATTsk4miZHWDZSg4Vv',
)

export enum NFTCreatingStep {
  information,
  metadata,
  properties,
}

export type MetaplexMethod =
  | 'findAllByCreator'
  | 'createNFT'
  | 'findAllByMintList'
  | 'findAllNftsByOwner'
  | 'findByMint'
  | 'getCost'
  | 'load'
  | 'printNewEdition'
  | 'uploadFile'
  | 'uploadMetadata'

export const TOKEN_PROGRAM = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'

export enum FileType {
  Png = 'png',
  Jpg = 'jpg',
  Gif = 'gif',
  Jpeg = 'jpeg',
}
