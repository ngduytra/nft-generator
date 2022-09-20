import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UploadChangeParam } from 'antd/lib/upload/interface'
import { toMetaplexFileFromBrowser } from '@metaplex-foundation/js'

import {
  Col,
  Input,
  Row,
  Space,
  Switch,
  Typography,
  Image,
  Upload,
  Button,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { AppState } from 'model'
import {
  setCollectionInfo,
  setCurrentStep,
  setDisplayedImage,
  setHasImageLink,
  setImage,
  setImageLink,
  setIsCollection,
  setName,
  setSellerFeeBasisPoints,
} from 'model/nftSetup.controller'
import { beforeUpload, fileToBase64 } from 'helper'
import { NFTCreatingStep } from 'constant'

type InformationStepProps = {
  onCancel: () => void
}

const InformationStep = ({ onCancel }: InformationStepProps) => {
  const name = useSelector((state: AppState) => state.nftSetup.name)
  const imageLink = useSelector((state: AppState) => state.nftSetup.imageLink)
  const sellerFeeBasisPoints = useSelector(
    (state: AppState) => state.nftSetup.sellerFeeBasisPoints,
  )

  const collectionInfo = useSelector(
    (state: AppState) => state.nftSetup.collectionInfo,
  )
  const isCollection = useSelector(
    (state: AppState) => state.nftSetup.isCollection,
  )
  const displayedImage = useSelector(
    (state: AppState) => state.nftSetup.displayedImage,
  )
  const hasImageLink = useSelector(
    (state: AppState) => state.nftSetup.hasImageLink,
  )

  const dispatch = useDispatch()

  const onChangeImage = async (file: UploadChangeParam) => {
    const { fileList } = file
    const originFile = fileList[0].originFileObj as File
    const metaplexImage = await toMetaplexFileFromBrowser(originFile)
    fileToBase64(originFile, (imgBase64: string | ArrayBuffer | null) => {
      dispatch(setDisplayedImage(imgBase64))
      dispatch(setImage(metaplexImage))
      return
    })
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Typography.Text type="secondary">NAME</Typography.Text>
          <Input
            placeholder="Enter name of NFT"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Typography.Text type="secondary">
            SELLER FEE BASIS POINTS
          </Typography.Text>
          <Input
            type="number"
            value={sellerFeeBasisPoints}
            onChange={(e) =>
              dispatch(setSellerFeeBasisPoints(Number(e.target.value)))
            }
          />
        </Space>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Row>
              <Col>
                <Typography.Text type="secondary">IMAGE</Typography.Text>
              </Col>
              <Col flex="auto">
                <Row justify="end" gutter={[6, 6]}>
                  <Col>
                    <Typography.Text>Had Image Url?</Typography.Text>{' '}
                  </Col>
                  <Col>
                    <Switch
                      checked={hasImageLink}
                      onChange={() => dispatch(setHasImageLink(!hasImageLink))}
                      size="small"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            {hasImageLink ? (
              <Input
                value={imageLink}
                onChange={(e) => dispatch(setImageLink(e.target.value))}
              />
            ) : displayedImage ? (
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Image
                    src={displayedImage.toString() || ''}
                    preview={false}
                    width={64}
                    height={64}
                    style={{ borderRadius: 8 }}
                  />
                </Col>
                <Col>
                  <Button
                    onClick={() => {
                      dispatch(setImage(''))
                      dispatch(setDisplayedImage(''))
                    }}
                    size="small"
                  >
                    Remove Image
                  </Button>
                </Col>
              </Row>
            ) : (
              <Upload
                name="avatar"
                listType="picture-card"
                accept="image/png,image/jpg,image/webp"
                className="avatar-uploader"
                showUploadList={false}
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
      <Col span={24}>
        <Row gutter={[4, 4]}>
          <Col span={24}>
            <Row>
              <Col>
                <Typography.Title level={5}> Collection</Typography.Title>
              </Col>
              <Col flex="auto">
                <Row justify="end" gutter={[6, 6]}>
                  <Col>
                    <Typography.Text>New Collection?</Typography.Text>{' '}
                  </Col>
                  <Col>
                    <Switch
                      checked={isCollection}
                      onChange={() => dispatch(setIsCollection(!isCollection))}
                      size="small"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          {!isCollection && (
            <Col span={24}>
              <Row gutter={[12, 12]}>
                <Col span={24}>
                  <Space
                    direction="vertical"
                    size={8}
                    style={{ width: '100%' }}
                  >
                    <Typography.Text type="secondary">NAME</Typography.Text>
                    <Input
                      placeholder="Name"
                      value={collectionInfo.name}
                      onChange={(e) =>
                        dispatch(
                          setCollectionInfo({
                            ...collectionInfo,
                            name: e.target.value,
                          }),
                        )
                      }
                    />
                  </Space>
                </Col>
                <Col span={24}>
                  <Space
                    direction="vertical"
                    size={8}
                    style={{ width: '100%' }}
                  >
                    <Typography.Text type="secondary">FAMILY</Typography.Text>
                    <Input
                      placeholder="Family"
                      value={collectionInfo.family}
                      onChange={(e) =>
                        dispatch(
                          setCollectionInfo({
                            ...collectionInfo,
                            family: e.target.value,
                          }),
                        )
                      }
                    />
                  </Space>
                </Col>
                <Col span={24}>
                  <Space
                    direction="vertical"
                    size={8}
                    style={{ width: '100%' }}
                  >
                    <Typography.Text type="secondary">
                      COLLECTION ADDRESS
                    </Typography.Text>
                    <Input
                      placeholder="AoqVpXWs4mnXAJp6L...."
                      value={collectionInfo.address as any}
                      onChange={(e) =>
                        dispatch(
                          setCollectionInfo({
                            ...collectionInfo,
                            address: e.target.value,
                          }),
                        )
                      }
                    />
                  </Space>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Button ghost block onClick={onCancel}>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              block
              onClick={() => dispatch(setCurrentStep(NFTCreatingStep.metadata))}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default InformationStep
