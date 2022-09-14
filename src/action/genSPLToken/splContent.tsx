import { useState } from 'react'
import {
  getMinimumBalanceForRentExemptMint,
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  MintLayout,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from '@solana/spl-token'
import {
  PROGRAM_ID,
  DataV2,
  createCreateMetadataAccountV2Instruction,
} from '@metaplex-foundation/mpl-token-metadata'

import {
  Card,
  Col,
  Input,
  Row,
  Space,
  Switch,
  Typography,
  Image,
  Button,
  Upload,
  Checkbox,
} from 'antd'

import { beforeUpload, fileToBase64, notifyError, notifySuccess } from 'helper'
import { useMetaplex } from 'hooks/useMetaplex'
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'
import { rpc, useWalletAddress } from '@sentre/senhub'
import {
  MetaplexFile,
  toMetaplexFileFromBrowser,
} from '@metaplex-foundation/js'
import IonIcon from '@sentre/antd-ionicon'
import { UploadChangeParam } from 'antd/lib/upload/interface'
import { AnchorProvider } from '@project-serum/anchor'
import { ConcreteMetaplexAdapter } from 'lib/walletMetaplexAdapter'

const wallet = window.sentre.wallet

const SPLContent = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [supply, setSupply] = useState('')
  const [decimal, setDecimal] = useState('')
  const [metadataURL, setMetadataUrl] = useState('')
  const [displayedImage, setDisplayedImage] = useState<
    string | ArrayBuffer | null
  >('')
  const [freezeAuthority, setFreezeAuthority] = useState(false)
  const [hasMetadataURL, setHasMetadataURL] = useState(false)
  const [image, setImage] = useState<MetaplexFile | string>('')
  const [isImageLink, setIsImageLink] = useState(false)
  const [description, setDescription] = useState('')
  const nftMachine = useMetaplex()
  const walletAddress = useWalletAddress()

  const connection = new Connection(rpc)

  const genSplToken = async () => {
    setLoading(true)
    try {
      const walletAdapter = await ConcreteMetaplexAdapter.createPublicKey(
        wallet,
      )
      if (!nftMachine) return

      const provider = await new AnchorProvider(connection, walletAdapter, {})

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
      let URI: string = ''

      if (hasMetadataURL) {
        if (metadataURL !== '') {
          URI = metadataURL
        } else {
          setLoading(false)
          setError('Please provide a metadata URL!')
        }
      } else {
        if (image && typeof image !== 'string') {
          const ImageUri = await nftMachine.uploadFile(image)

          if (ImageUri) {
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
        } else {
          setLoading(false)
          setError('Please provide an image file!')
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

        const createMintAccountInstruction = await SystemProgram.createAccount({
          fromPubkey: new PublicKey(walletAddress),
          newAccountPubkey: mintAccount.publicKey,
          space: MintLayout.span,
          lamports: mintRent,
          programId: TOKEN_PROGRAM_ID,
        })

        if (freezeAuthority) {
          initMint = await createInitializeMintInstruction(
            mintAccount.publicKey,
            Number(decimal),
            new PublicKey(walletAddress),
            new PublicKey(walletAddress),
            TOKEN_PROGRAM_ID,
          )
        } else {
          initMint = await createInitializeMintInstruction(
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
    } catch (err) {
      notifyError(err)
    } finally {
      setLoading(false)
    }
  }

  const onChangeImage = async (file: UploadChangeParam) => {
    const { fileList } = file
    const originFile = fileList[0].originFileObj as File
    const metaplexImage = await toMetaplexFileFromBrowser(originFile)
    fileToBase64(originFile, (imgBase64: string | ArrayBuffer | null) => {
      setImage(metaplexImage)
      setDisplayedImage(imgBase64)
      return
    })
  }

  return (
    <Row>
      <Col>
        <Typography.Title level={4}>Token Infos</Typography.Title>
        <Row>
          <Col span={24}>
            <Typography.Text>Token Name</Typography.Text>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Col>
          <Col span={24}>
            <Typography.Text>Symbol</Typography.Text>
            <Input value={symbol} onChange={(e) => setSymbol(e.target.value)} />
          </Col>
          <Col span={24}>
            <Typography.Text>Number of tokens to mint</Typography.Text>
            <Input value={supply} onChange={(e) => setSupply(e.target.value)} />
          </Col>
          <Col span={24}>
            <Typography.Text>Decimal</Typography.Text>
            <Input
              value={decimal}
              onChange={(e) => setDecimal(e.target.value)}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row>
          <Col>
            <Typography.Title level={4}>Metadata</Typography.Title>
          </Col>
          <Col>
            <Space style={{ width: '100%' }}>
              <Switch
                checked={hasMetadataURL}
                onChange={() => setHasMetadataURL(!hasMetadataURL)}
                size="small"
              />
            </Space>
          </Col>
        </Row>
        {hasMetadataURL ? (
          <Row>
            <Col span={24}>
              <Typography.Text>Metadata URL</Typography.Text>
              <Input
                value={metadataURL}
                onChange={(e) => {
                  setMetadataUrl(e.target.value)
                }}
              />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col span={24}>
              <Typography.Text>Description</Typography.Text>
              <Input
                placeholder="Description of the token/project"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
            </Col>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Typography.Title level={5}>Image</Typography.Title>
                </Col>
                <Col span={12}>
                  <Space
                    style={{ width: '100%' }}
                    direction="vertical"
                    align="end"
                  >
                    <Switch
                      checked={isImageLink}
                      onChange={() => {
                        setIsImageLink(!isImageLink)
                        setImage('')
                        setDisplayedImage('')
                      }}
                      size="small"
                    />
                  </Space>
                </Col>
                <Col span={24}>
                  {isImageLink && typeof image === 'string' ? (
                    <Row>
                      <Col>
                        <Input
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                        />
                        <Image src={image} preview={false} />
                      </Col>
                    </Row>
                  ) : displayedImage ? (
                    <Card>
                      <Image
                        src={displayedImage.toString() || ''}
                        preview={false}
                      />
                      <Button
                        onClick={() => {
                          setImage('')
                          setDisplayedImage('')
                        }}
                      >
                        Remove Image
                      </Button>
                    </Card>
                  ) : (
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      accept="image/png,image/jpg,image/webp"
                      className="avatar-uploader"
                      showUploadList={false}
                      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={beforeUpload}
                      onChange={onChangeImage}
                      maxCount={1}
                      onRemove={() => {
                        setImage('')
                        return true
                      }}
                    >
                      <IonIcon name="add-outline" />
                    </Upload>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Col>
      <Col>
        <Typography.Title level={4}>Authority </Typography.Title>
        <Row>
          <Col span={24}>
            <Typography.Text>Enable freeze authority</Typography.Text>
            <Checkbox
              checked={freezeAuthority}
              onChange={() => setFreezeAuthority(!freezeAuthority)}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Button onClick={genSplToken} block loading={loading}>
          Create Token
        </Button>
      </Col>
    </Row>
  )
}

export default SPLContent
