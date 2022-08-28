import React, { useState } from 'react'

import {
  Button,
  Col,
  Input,
  InputNumber,
  Row,
  Space,
  Tooltip,
  Typography,
  Switch,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { useNft } from 'hooks/useNft'
import { notifyError, notifySuccess } from 'helper'
import { ADVANCE_CREATE_NFT_INPUT } from 'constant'

const ModalContent = () => {
  const [name, setName] = useState('')
  const [sellerFee, setSellerFee] = useState(0)
  const [isAdvance, setIsAdvance] = useState(false)
  const [symbol, setSymbol] = useState<string | undefined>()
  const [description, setDescription] = useState<string | undefined>('')
  const [image, setImage] = useState<string | undefined>()
  const [externalUrl, setExternalUrl] = useState<string | undefined>()
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

  const [collection, setCollection] = useState<{
    name?: string
    family?: string
    [key: string]: unknown
  }>({})

  const nftMachine = useNft()

  const genNFT = async () => {
    try {
      if (!nftMachine) return
      const { uri } = await nftMachine.uploadMetadata({
        // name: 'nae',
        // symbol: symbol,
        // description: description,
        // seller_fee_basis_points: sellerFee,
        // image: image,
        // external_url: externalUrl,
        // attributes: attributes,
        // properties: {
        //   creators: creators,
        //   files: files,
        // },
        // collection: collection,
      })
      console.log(' upload metadata thanh cong: ', uri)
      await nftMachine.createNFT({
        uri: uri,
        name: name,
        sellerFeeBasisPoints: sellerFee,
      })
      notifySuccess('Create NFT', '')
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

  return (
    <Row>
      <Col>
        <Typography.Title level={2} className="text-center">
          Create NFTs, Raise your Style
        </Typography.Title>
      </Col>
      <Col>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Space style={{ width: '100%' }} direction="vertical" align="end">
              <Switch
                checked={isAdvance}
                onChange={() => setIsAdvance(!isAdvance)}
                size="small"
              />
            </Space>
          </Col>
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
                    <Typography.Text> Creators</Typography.Text>
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
                    >
                      Add Creator
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Typography.Text> Files</Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Space direction="vertical">
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
                    >
                      Add file
                    </Button>
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    <Typography.Text> Collection</Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Space style={{ width: '100%' }}>
                      <Input
                        placeholder="type"
                        value={collection.name}
                        onChange={(e) =>
                          setCollection({
                            ...collection,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="value"
                        value={collection.family}
                        onChange={(e) =>
                          setCollection({
                            ...collection,
                            family: e.target.value,
                          })
                        }
                      />
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
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
