import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PublicKey } from '@solana/web3.js'
import { JsonMetadata } from '@metaplex-foundation/js'
import IonIcon from '@sentre/antd-ionicon'

import { Button, Col, Row, Typography, Image, Space, Input } from 'antd'

import Dummy from '../../static/images/dummy.png'
import { useMetaplex } from 'hooks/useMetaplex'
import { useAppRouter } from 'hooks/useAppRouter'
import { notifyError, notifySuccess } from 'helper'

const UpdateNFT = () => {
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState<JsonMetadata<string>>({})
  const [nftInfo, setNftInfo] = useState<any>()
  const params = useParams<{ address: string }>()
  const nftMachine = useMetaplex()
  const { pushHistory } = useAppRouter()

  const getNFTInfo = useCallback(async () => {
    const nft = await nftMachine?.findByMint(new PublicKey(params.address))
    setNftInfo(nft)
    if (nft?.json) setMetadata({ ...nft?.json })
  }, [nftMachine, params.address])

  useEffect(() => {
    if (!params || !params.address) {
      pushHistory('/nft')
    }
    getNFTInfo()
  }, [params, pushHistory, getNFTInfo])

  const onChangeAttributes = (
    index: number,
    value: { trait_type?: string; value?: string },
  ) => {
    const newAttributes = [...(metadata.attributes || [])]
    newAttributes[index] = value
    return setMetadata({ ...metadata, attributes: newAttributes })
  }

  const onUpdateMetadata = async () => {
    try {
      setLoading(true)
      if (!nftMachine || !nftInfo) return
      // Define a variables for on-chain Metadata
      const onChainMetadata: any = {}
      // const newFiles: any[] = {}
      onChainMetadata.nftOrSft = nftInfo
      onChainMetadata.name = metadata.name || ''
      onChainMetadata.symbol = metadata.symbol || ''
      onChainMetadata.description = metadata.description || ''
      onChainMetadata.seller_fee_basis_points =
        metadata.seller_fee_basis_points || ''
      onChainMetadata.external_url = metadata.external_url || ''

      const newUri = await nftMachine.uploadMetadata(metadata)
      if (newUri) {
        console.log(newUri)
        onChainMetadata.uri = newUri
      }

      const { response } = await nftMachine.update(onChainMetadata)
      getNFTInfo()
      notifySuccess('Update metadata', response.signature)
    } catch (err) {
      notifyError(err)
    } finally {
      setLoading(false)
    }
  }

  if (!nftInfo)
    return (
      <Row justify="center">
        <Col>
          <Typography.Text>
            Opps, can't fetch NFT,{' '}
            <Button
              onClick={() => {
                pushHistory('/nft')
              }}
            >
              Click Here
            </Button>{' '}
            to come back
          </Typography.Text>
        </Col>
      </Row>
    )
  return (
    <Row justify="center" gutter={[24, 24]} style={{ marginBottom: 24 }}>
      <Col span={24}>
        <Space style={{ width: '100%' }} direction="vertical" align="center">
          <Typography.Title level={2}>
            Update the metadata of your NFT
          </Typography.Title>
        </Space>
      </Col>
      <Col lg={16}>
        <Row gutter={[12, 12]} justify="center">
          <Col span={24}>
            <Space
              style={{ width: '100%' }}
              direction="vertical"
              align="center"
            >
              <Typography.Title level={3}>You want to Update</Typography.Title>
            </Space>
          </Col>
          <Col span={24}>
            <Row gutter={[12, 12]}>
              <Col span={10}>
                <Space direction="vertical" size={12}>
                  <Image
                    src={nftInfo?.json?.image || Dummy}
                    preview={false}
                    style={{ borderRadius: 12, aspectRatio: '1' }}
                  />
                  <Typography.Text>
                    {nftInfo?.json?.name || 'Unknown NFT'}
                  </Typography.Text>
                </Space>
              </Col>
              <Col flex={1}>
                <Typography.Title level={5}>Description</Typography.Title>
                <Typography.Text>{nftInfo?.json?.description}</Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col lg={16}>
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <Typography.Title level={3}>
            Fill in the inputs you want to update
          </Typography.Title>
        </Space>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Typography.Text type="secondary">NAME</Typography.Text>
              <Input
                placeholder="Enter name of NFT"
                value={metadata?.name || ''}
                onChange={(e) =>
                  setMetadata({ ...metadata, name: e.target.value })
                }
              />
            </Space>
          </Col>
          <Col span={24}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Typography.Text type="secondary">SYMBOL</Typography.Text>
              <Input
                placeholder="Enter symbol of NFT"
                value={metadata?.symbol || ''}
                onChange={(e) =>
                  setMetadata({ ...metadata, symbol: e.target.value })
                }
              />
            </Space>
          </Col>
          <Col span={24}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Typography.Text type="secondary">DESCRIPTION</Typography.Text>
              <Input
                placeholder="Enter description of NFT"
                value={metadata?.description || ''}
                onChange={(e) =>
                  setMetadata({ ...metadata, description: e.target.value })
                }
              />
            </Space>
          </Col>
          <Col span={24}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Typography.Text type="secondary">ROYALTIES</Typography.Text>
              <Input
                placeholder="Enter royalties of NFT"
                value={metadata?.seller_fee_basis_points || ''}
                onChange={(e) =>
                  setMetadata({
                    ...metadata,
                    seller_fee_basis_points: Number(e.target.value),
                  })
                }
              />
            </Space>
          </Col>
          <Col span={24}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Typography.Text type="secondary">IMAGE URI</Typography.Text>
              <Input
                placeholder="Enter image of NFT"
                value={metadata?.image || ''}
                onChange={(e) =>
                  setMetadata({ ...metadata, image: e.target.value })
                }
              />
            </Space>
          </Col>
          <Col span={24}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Typography.Text type="secondary">EXTERNAL URL</Typography.Text>
              <Input
                placeholder="Enter an external url of NFT"
                value={metadata?.external_url || ''}
                onChange={(e) =>
                  setMetadata({ ...metadata, external_url: e.target.value })
                }
              />
            </Space>
          </Col>
        </Row>
      </Col>
      <Col lg={16}>
        <Row justify="center">
          <Col span={24}>
            <Space
              direction="vertical"
              size={8}
              style={{ width: '100%' }}
              align="center"
            >
              <Typography.Title level={4}>Attributes</Typography.Title>
            </Space>
          </Col>
          <Col span={24}>
            <Space
              direction="vertical"
              size={8}
              style={{ width: '100%' }}
              align="center"
            >
              <Typography.Title level={5}>
                Attributes defining the characteristics of the asset
              </Typography.Title>
            </Space>
          </Col>
        </Row>

        <Row gutter={[6, 6]}>
          <Col span={24}>
            <Row gutter={[12, 12]}>
              {metadata?.attributes?.map((attribute, idx) => (
                <Col span={24} key={idx}>
                  <Row gutter={[12, 12]}>
                    <Col span={24}>
                      <Row>
                        <Col>
                          <Typography.Text type="secondary">
                            #{idx}
                          </Typography.Text>
                        </Col>
                        <Col flex="auto">
                          <Space
                            style={{ width: '100%' }}
                            direction="vertical"
                            align="end"
                          >
                            <Button
                              size="small"
                              onClick={() => {
                                const newAttributes = [
                                  ...(metadata?.attributes || []),
                                ].filter((_, index) => index !== idx)
                                setMetadata({
                                  ...metadata,
                                  attributes: newAttributes,
                                })
                              }}
                            >
                              <IonIcon name="trash-outline" />
                            </Button>
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Input
                        placeholder="Enter trait type"
                        value={attribute.trait_type || ''}
                        onChange={(e) =>
                          onChangeAttributes(idx, {
                            ...attribute,
                            trait_type: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col span={12}>
                      <Input
                        placeholder="Enter URI of file"
                        value={attribute.value}
                        onChange={(e) =>
                          onChangeAttributes(idx, {
                            ...attribute,
                            value: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={24}>
            <Button
              block
              type="dashed"
              onClick={() => {
                const newAttributes = [
                  ...(metadata?.attributes || []),
                  { trait_type: '', value: '' },
                ]

                setMetadata({ ...metadata, attributes: newAttributes })
              }}
            >
              <IonIcon name="add-outline" />
              Add more
            </Button>
          </Col>
        </Row>
      </Col>
      <Col lg={16}>
        <Button
          block
          type="primary"
          onClick={onUpdateMetadata}
          loading={loading}
        >
          Update
        </Button>
      </Col>
    </Row>
  )
}

export default UpdateNFT
