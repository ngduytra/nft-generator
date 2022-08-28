import { PublicKey } from '@solana/web3.js'

export const HOME_TAB: Record<string, string> = {
  NFT: 'nft',
  COLLECTION: 'collection',
}

export const ADVANCE_CREATE_NFT_INPUT = [
  { title: 'Payer', description: '', type: '' },
  { title: 'Update Authority', description: '', type: '' },
  { title: 'Mint Authority', description: '', type: '' },
  { title: 'Use New Mint', description: '', type: '' },
  { title: 'Use Existing Mint', description: '', type: '' },
  { title: 'Token Owner', description: '', type: '' },
  { title: 'Token Address', description: '', type: '' },
  { title: 'Symbol', description: '', type: '' },
  { title: 'Creators', description: '', type: '' },
  { title: 'Is mutable', description: '', type: '' },
  { title: 'Max Supply', description: '', type: '' },
  { title: 'Uses', description: '', type: '' },
  { title: 'Is Collection', description: '', type: '' },
  { title: 'Collection', description: '', type: '' },
  { title: 'Collection Authority', description: '', type: '' },
  { title: 'Collection Authority Is Delegated', description: '', type: '' },
  { title: 'Collection Is Sized', description: '', type: '' },
  { title: 'Token Program', description: '', type: '' },
  { title: 'Associated TokenProgram', description: '', type: '' },
  { title: 'Confirm Options', description: '', type: '' },
]

export const PROJECT_PUBLIC_KEY = new PublicKey(
  'DBHmm6zJP13cuVepfFwp8mXtNRATTsk4miZHWDZSg4Vv',
)
