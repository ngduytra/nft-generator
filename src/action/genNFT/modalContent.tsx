import { useCallback, useEffect, useState } from 'react'
import { util } from '@sentre/senhub'
import { PublicKey } from '@solana/web3.js'

import {
  Button,
  Col,
  Input,
  InputNumber,
  Image,
  Row,
  Space,
  Tooltip,
  Typography,
  Switch,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { useNft } from 'hooks/useNft'
import { notifyError, notifySuccess } from 'helper'

const ModalContent = () => {
  const [isNewMetadata, setIsNewMetadata] = useState(false)
  const [name, setName] = useState('')
  const [sellerFee, setSellerFee] = useState(0)
  const [symbol, setSymbol] = useState<string | undefined>()
  const [description, setDescription] = useState<string | undefined>('')
  const [image, setImage] = useState<string | undefined>()
  const [uri, setUri] = useState('')
  const [externalUrl, setExternalUrl] = useState<string | undefined>()
  const [isCollection, setIsCollection] = useState(false)
  const [numberOfCollection, setNumberOfCollection] = useState(0)
  const [attributes, setAttributes] = useState<
    Array<{
      trait_type?: string
      value?: string
      [key: string]: unknown
    }>
  >([])
  const [creators, setCreators] = useState<
    Array<{
      address?: string
      share?: number
      [key: string]: unknown
    }>
  >([])
  const [files, setFiles] = useState<
    Array<{
      type?: string
      uri?: string
      [key: string]: unknown
    }>
  >([])

  const [collectionInfo, setCollectionInfo] = useState<{
    name?: string
    family?: string
    [key: string]: unknown
  }>({})
  const [belongToCollection, setBelongToCollection] = useState<
    string | undefined
  >()

  const nftMachine = useNft()

  const genNFT = async () => {
    try {
      if (!nftMachine) return
      // const { uri } = await nftMachine.uploadMetadata({
      //   name: name,
      //   symbol: symbol,
      //   description: description,
      //   seller_fee_basis_points: sellerFee,
      //   image: image,
      //   external_url: externalUrl,
      //   attributes: attributes,
      //   properties: {
      //     creators: creators,
      //     files: files,
      //   },
      //   collection: collectionInfo,
      // })
      if (isCollection) {
        const collectionNFT = await nftMachine.createNFT({
          uri: uri,
          name: name,
          sellerFeeBasisPoints: sellerFee,
          isCollection,
        })

        for (const key in new Array(numberOfCollection).fill('dummy')) {
          await nftMachine.createNFT({
            uri: uri,
            name: name + `${key}`,
            sellerFeeBasisPoints: sellerFee,
            collection: collectionNFT.address,
          })
        }
        return notifySuccess(
          `Create ${numberOfCollection} NFT belong to collection ${name}`,
          '',
        )
      }
      if (!util.isAddress(belongToCollection)) {
        await nftMachine.createNFT({
          uri: uri,
          name: name,
          sellerFeeBasisPoints: sellerFee,
        })
        return notifySuccess(`Create NFT ${name}`, '')
      }

      await nftMachine.createNFT({
        uri: uri,
        name: name,
        sellerFeeBasisPoints: sellerFee,
        collection: new PublicKey(`${belongToCollection}`),
      })

      notifySuccess(`Create NFT ${name}`, '')
    } catch (err) {
      notifyError(err)
    }
  }

  const onChangeAttributes = (
    index: number,
    value: { trait_type?: string; value?: string },
  ) => {
    const newAttributes = [...attributes]
    newAttributes[index] = value
    return setAttributes(newAttributes)
  }

  const onChangeCreators = (
    index: number,
    value: { address?: string; share?: number },
  ) => {
    const newCreators = [...creators]
    newCreators[index] = value
    return setCreators(newCreators)
  }

  const onChangeFiles = (
    index: number,
    value: { type?: string; uri?: string },
  ) => {
    const newFiles = [...files]
    newFiles[index] = value
    return setFiles(newFiles)
  }

  // Temp for available uri
  const getNFTImage = useCallback(async () => {
    try {
      const metadata = await (await fetch(uri)).json()
      if (!metadata.image) return setImage('')
      setImage(metadata?.image)
    } catch (e) {
      setImage('')
    }
  }, [uri])

  useEffect(() => {
    getNFTImage()
  }, [getNFTImage])

  return (
    <Row>
      <Col>
        <Typography.Title level={2} className="text-center">
          Create NFTs, Raise your Style
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Row justify="end" align="middle">
          <Typography.Text>Upload new metadata?</Typography.Text>{' '}
          <Switch
            checked={isNewMetadata}
            onChange={() => setIsNewMetadata(!isNewMetadata)}
            size="small"
          />
        </Row>
      </Col>
      <Col>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Typography.Title level={5}>Name</Typography.Title>
            <Input
              placeholder="Your name, your thought"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>

          <Col span={24}>
            <Space style={{ width: '100%' }} align="center">
              <Typography.Title level={5}>
                Seller Fee Basis Points
              </Typography.Title>
              <Tooltip title="Seller Fee Basis Points">
                <IonIcon name="information-circle-outline" />
              </Tooltip>
            </Space>
            <InputNumber
              placeholder="Your Put, Their Thought"
              value={sellerFee}
              onChange={setSellerFee}
            />
          </Col>
          <Col span={24}>
            <Row gutter={[4, 4]}>
              <Col span={12}>
                <Typography.Title level={5}> Collection</Typography.Title>
              </Col>
              <Col span={12}>
                <Typography.Text>New Collection?</Typography.Text>{' '}
                <Switch
                  checked={isCollection}
                  onChange={() => setIsCollection(!isCollection)}
                  size="small"
                />
              </Col>

              <Col span={24}>
                {isCollection ? (
                  <Row gutter={[4, 4]}>
                    <Col span={12}>
                      <Typography.Text>Name</Typography.Text>
                      <Input
                        placeholder="Name"
                        value={collectionInfo.name}
                        onChange={(e) =>
                          setCollectionInfo({
                            ...collectionInfo,
                            name: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col span={12}>
                      <Typography.Text>Family</Typography.Text>
                      <Input
                        placeholder="Family"
                        value={collectionInfo.family}
                        onChange={(e) =>
                          setCollectionInfo({
                            ...collectionInfo,
                            family: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col span={24}>
                      <Typography.Text>Number of NFT</Typography.Text>
                      <InputNumber
                        placeholder="What is the number of NFT that you want to created?"
                        value={numberOfCollection}
                        onChange={(val) => setNumberOfCollection(val)}
                      />
                    </Col>
                  </Row>
                ) : (
                  <Input
                    placeholder="Collection address"
                    value={belongToCollection}
                    onChange={(e) => setBelongToCollection(e.target.value)}
                  />
                )}
              </Col>
            </Row>
          </Col>
          {isNewMetadata ? (
            <Col span={24}>
              <Space style={{ width: '100%' }} align="center">
                <Typography.Title level={5}>Metadata</Typography.Title>
                <Tooltip title="Infomation of your NFT">
                  <IonIcon name="information-circle-outline" />
                </Tooltip>
              </Space>
              <Row gutter={[12, 12]}>
                <Col span={10}>
                  <Typography.Text> Symbol</Typography.Text>
                  <Input
                    placeholder="symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                  />
                </Col>
                <Col span={4}></Col>
                <Col span={10}>
                  <Typography.Text> Description</Typography.Text>
                  <Input
                    placeholder="Come from where?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>

                <Col span={10}>
                  <Typography.Text> External Url</Typography.Text>
                  <Input
                    placeholder="External links"
                    value={externalUrl}
                    onChange={(e) => setExternalUrl(e.target.value)}
                  />
                </Col>
                <Col span={4}></Col>
                <Col span={10}>
                  <Typography.Text> Image</Typography.Text>
                  <Input
                    placeholder="NFT thumnail"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </Col>
                <Col span={24}>
                  <Row gutter={[12, 12]}>
                    <Col span={24}>
                      <Typography.Text> Attributes</Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Space direction="vertical">
                        {attributes.map((attribute, idx) => (
                          <Space style={{ width: '100%' }}>
                            <Input
                              placeholder="type"
                              value={attribute.trait_type}
                              onChange={(e) =>
                                onChangeAttributes(idx, {
                                  ...attribute,
                                  trait_type: e.target.value,
                                })
                              }
                            />
                            <Input
                              placeholder="value"
                              value={attribute.value}
                              onChange={(e) =>
                                onChangeAttributes(idx, {
                                  ...attribute,
                                  value: e.target.value,
                                })
                              }
                            />
                          </Space>
                        ))}
                      </Space>
                    </Col>
                    <Col>
                      <Button
                        block
                        ghost
                        onClick={() => {
                          const newAttributes = [
                            ...attributes,
                            { trait_type: '', value: '' },
                          ]
                          setAttributes(newAttributes)
                        }}
                        size="small"
                      >
                        Add Attribute
                      </Button>
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Typography.Text>Properties</Typography.Text>
                  <Row gutter={[12, 12]}>
                    <Col span={24}>
                      <Typography.Text style={{ fontSize: 12 }}>
                        {' '}
                        Creators
                      </Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Space direction="vertical">
                        {creators.map((creator, idx) => (
                          <Space style={{ width: '100%' }}>
                            <Input
                              placeholder="Address"
                              value={creator.address}
                              onChange={(e) =>
                                onChangeCreators(idx, {
                                  ...creator,
                                  address: e.target.value,
                                })
                              }
                            />
                            <InputNumber
                              placeholder="Share"
                              value={creator.share}
                              onChange={(val) =>
                                onChangeCreators(idx, {
                                  ...creator,
                                  share: val,
                                })
                              }
                            />
                          </Space>
                        ))}
                      </Space>
                    </Col>
                    <Col>
                      <Button
                        block
                        ghost
                        onClick={() => {
                          const newCreators = [...creators, { address: '' }]
                          setCreators(newCreators)
                        }}
                        size="small"
                      >
                        Add Creator
                      </Button>
                    </Col>
                  </Row>
                  <Row gutter={[12, 12]}>
                    <Col span={24}>
                      <Typography.Text style={{ fontSize: 12 }}>
                        {' '}
                        Files
                      </Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Space direction="vertical" size={8}>
                        {files.map((file, idx) => (
                          <Space style={{ width: '100%' }}>
                            <Input
                              placeholder="File type"
                              value={file.type}
                              onChange={(e) =>
                                onChangeFiles(idx, {
                                  ...file,
                                  type: e.target.value,
                                })
                              }
                            />
                            <Input
                              placeholder="Uri of file"
                              value={file.uri}
                              onChange={(e) =>
                                onChangeFiles(idx, {
                                  ...file,
                                  uri: e.target.value,
                                })
                              }
                            />
                          </Space>
                        ))}
                      </Space>
                    </Col>
                    <Col>
                      <Button
                        block
                        ghost
                        onClick={() => {
                          const newFiles = [...files, { type: '', uri: '' }]
                          setFiles(newFiles)
                        }}
                        size="small"
                      >
                        Add file
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          ) : (
            <Col span={24}>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Typography.Title level={5}>URI</Typography.Title>
                  <Input
                    placeholder="Your Uri"
                    value={uri}
                    onChange={(e) => setUri(e.target.value)}
                  />
                </Col>
                <Col>
                  <Image src={image} />
                </Col>
              </Row>
            </Col>
          )}

          <Col span={24}>
            <Button onClick={genNFT} block>
              Get Your Unique
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ModalContent
