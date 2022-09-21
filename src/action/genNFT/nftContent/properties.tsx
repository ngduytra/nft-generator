import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Input, Row, Space, Typography } from 'antd'
import {
  setAttributes,
  setCreators,
  setCurrentStep,
  setFiles,
} from 'model/nftSetup.controller'
import IonIcon from '@sentre/antd-ionicon'

import { NFTCreatingStep } from 'constant'
import { useGenNFT } from 'hooks/actions/useGenNFT'
import { AppState } from 'model'

const Properties = () => {
  const attributes = useSelector((state: AppState) => state.nftSetup.attributes)
  const creators = useSelector((state: AppState) => state.nftSetup.creators)
  const files = useSelector((state: AppState) => state.nftSetup.files)
  const { genNFT, loading } = useGenNFT()

  const dispatch = useDispatch()

  const onChangeAttributes = (
    index: number,
    value: { trait_type?: string; value?: string },
  ) => {
    const newAttributes = [...attributes]
    newAttributes[index] = value
    return dispatch(setAttributes(newAttributes))
  }

  const onChangeCreators = (
    index: number,
    value: { address: string; share: number },
  ) => {
    const newCreators = [...creators]
    newCreators[index] = value
    return dispatch(setCreators(newCreators))
  }

  const onChangeFiles = (
    index: number,
    value: { type?: string; uri?: string },
  ) => {
    const newFiles = [...files]
    newFiles[index] = value
    return dispatch(setFiles(newFiles))
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[6, 6]}>
          <Col span={24}>
            <Typography.Title level={5}>Attribute</Typography.Title>
          </Col>
          <Col span={24}>
            <Row gutter={[12, 12]}>
              {attributes.map((attribute, idx) => (
                <Col span={24}>
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
                                const newAttributes = [...attributes].filter(
                                  (_, index) => index !== idx,
                                )
                                dispatch(setAttributes(newAttributes))
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
                        placeholder="type"
                        value={attribute.trait_type}
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
                        placeholder="value"
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
                  ...attributes,
                  { trait_type: '', value: '' },
                ]
                dispatch(setAttributes(newAttributes))
              }}
            >
              <IonIcon name="add-outline" />
              Add more
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[6, 6]}>
          <Col span={24}>
            <Typography.Title level={5}>Creator</Typography.Title>
          </Col>
          <Col span={24}>
            <Row gutter={[12, 12]}>
              {creators.map((creator, idx) => (
                <Col span={24}>
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
                                const newCreators = [...creators].filter(
                                  (_, index) => index !== idx,
                                )
                                dispatch(setCreators(newCreators))
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
                        placeholder="Enter wallet address"
                        value={creator.address}
                        onChange={(e) => {
                          onChangeCreators(idx, {
                            ...creator,
                            address: e.target.value,
                          })
                        }}
                      />
                    </Col>
                    <Col span={12}>
                      <Input
                        placeholder="Share"
                        value={creator.share}
                        onChange={(e) =>
                          onChangeCreators(idx, {
                            ...creator,
                            share: Number(e.target.value),
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
                const newCreators = [...creators, { address: '', share: 0 }]
                dispatch(setCreators(newCreators))
              }}
            >
              <IonIcon name="add-outline" />
              Add more
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[6, 6]}>
          <Col span={24}>
            <Typography.Title level={5}>File</Typography.Title>
          </Col>
          <Col span={24}>
            <Row gutter={[12, 12]}>
              {files.map((file, idx) => (
                <Col span={24}>
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
                                const newFiles = [...files].filter(
                                  (_, index) => index !== idx,
                                )
                                dispatch(setFiles(newFiles))
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
                        placeholder="Enter file type"
                        value={file.type}
                        onChange={(e) =>
                          onChangeFiles(idx, {
                            ...file,
                            type: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col span={12}>
                      <Input
                        placeholder="Enter URI of file"
                        value={file.uri}
                        onChange={(e) =>
                          onChangeFiles(idx, {
                            ...file,
                            uri: e.target.value,
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
                const newFiles = [...files, { type: '', uri: '' }]
                dispatch(setFiles(newFiles))
              }}
            >
              <IonIcon name="add-outline" />
              Add more
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ marginTop: 16 }}>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Button
              ghost
              block
              onClick={() => dispatch(setCurrentStep(NFTCreatingStep.metadata))}
            >
              Back
            </Button>
          </Col>
          <Col span={12}>
            <Button type="primary" block onClick={genNFT} loading={loading}>
              Generate
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Properties
