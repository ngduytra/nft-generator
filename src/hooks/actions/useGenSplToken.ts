import { useCallback, useState } from 'react'
import { AnchorProvider } from '@project-serum/anchor'
import {
  PROGRAM_ID,
  DataV2,
  createCreateMetadataAccountV2Instruction,
} from '@metaplex-foundation/mpl-token-metadata'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
  MintLayout,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'
import { useWalletAddress } from '@sentre/senhub'
import { MetaplexFile } from '@metaplex-foundation/js'

import { useMetaplex } from '../useMetaplex'
import { ConcreteMetaplexAdapter } from 'lib/walletMetaplexAdapter'
import { notifyError, notifySuccess } from 'helper'
import configs from 'configs'

const {
  sol: { connection },
} = configs

type GenSplTokenProps = {
  name: string
  symbol: string
  description: string
  supply: number
  decimal: number
  hasMetadataURL: boolean
  metadataURL: string
  image: MetaplexFile | string
  freezeAuthority: boolean
}

export const useGenSplToken = () => {
  const nftMachine = useMetaplex()
  const [loading, setLoading] = useState(false)
  const walletAddress = useWalletAddress()

  const genSplToken = useCallback(
    async ({
      name,
      symbol,
      description,
      supply,
      decimal,
      hasMetadataURL,
      metadataURL,
      image,
      freezeAuthority,
    }: GenSplTokenProps) => {
      setLoading(true)
      try {
        if (!nftMachine) return

        const walletAdapter = await ConcreteMetaplexAdapter.createPublicKey(
          window.sentre.wallet,
        )
        const provider = new AnchorProvider(connection, walletAdapter, {})

        const mintRent = await getMinimumBalanceForRentExemptMint(connection)
        const mintAccount = Keypair.generate()
        let initMint: TransactionInstruction
        const [metadataPDA] = await PublicKey.findProgramAddress(
          [
            Buffer.from('metadata'),
            PROGRAM_ID.toBuffer(),
            mintAccount.publicKey.toBuffer(),
          ],
          PROGRAM_ID,
        )
        let URI: string = metadataURL

        if (!hasMetadataURL && image && typeof image !== 'string') {
          const uri = await nftMachine.uploadMetadata({
            name,
            symbol,
            description,
            image,
          })

          if (uri) {
            URI = uri
          }
        }

        if (URI) {
          const tokenMetadata: DataV2 = {
            name,
            symbol,
            uri: URI,
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
          }

          const args = {
            data: tokenMetadata,
            isMutable: true,
          }

          const createMintAccountInstruction = SystemProgram.createAccount({
            fromPubkey: new PublicKey(walletAddress),
            newAccountPubkey: mintAccount.publicKey,
            space: MintLayout.span,
            lamports: mintRent,
            programId: TOKEN_PROGRAM_ID,
          })

          if (freezeAuthority) {
            initMint = createInitializeMintInstruction(
              mintAccount.publicKey,
              Number(decimal),
              new PublicKey(walletAddress),
              new PublicKey(walletAddress),
              TOKEN_PROGRAM_ID,
            )
          } else {
            initMint = createInitializeMintInstruction(
              mintAccount.publicKey,
              Number(decimal),
              new PublicKey(walletAddress),
              null,
              TOKEN_PROGRAM_ID,
            )
          }

          const associatedTokenAccount = await getAssociatedTokenAddress(
            mintAccount.publicKey,
            new PublicKey(walletAddress),
            undefined,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID,
          )

          const createATAInstruction = createAssociatedTokenAccountInstruction(
            new PublicKey(walletAddress),
            associatedTokenAccount,
            new PublicKey(walletAddress),
            mintAccount.publicKey,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID,
          )

          const mintInstruction = createMintToInstruction(
            mintAccount.publicKey,
            associatedTokenAccount,
            new PublicKey(walletAddress),
            Number(supply) * 10 ** Number(decimal),
            undefined,
            TOKEN_PROGRAM_ID,
          )

          const MetadataInstruction = createCreateMetadataAccountV2Instruction(
            {
              metadata: metadataPDA,
              mint: mintAccount.publicKey,
              mintAuthority: new PublicKey(walletAddress),
              payer: new PublicKey(walletAddress),
              updateAuthority: new PublicKey(walletAddress),
            },
            {
              createMetadataAccountArgsV2: args,
            },
          )

          const createAccountTransaction = new Transaction().add(
            createMintAccountInstruction,
            initMint,
            createATAInstruction,
            mintInstruction,
            MetadataInstruction,
          )

          const createAccountSignature = await provider.sendAndConfirm(
            createAccountTransaction,
            [mintAccount],
          )

          const signature = createAccountSignature.toString()

          notifySuccess('Create token', signature)
        }
        return notifyError('Failed to get URI of metadata')
      } catch (err) {
        notifyError(err)
      } finally {
        setLoading(false)
      }
    },
    [nftMachine, walletAddress],
  )

  return { genSplToken, loading }
}
