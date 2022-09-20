import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Input, Row, Space, Typography } from 'antd'

import { AppState } from 'model'
import {
  setCurrentStep,
  setDescription,
  setExternalUrl,
  setSymbol,
} from 'model/nftSetup.controller'
import { NFTCreatingStep } from 'constant'

const MetadataStep = () => {
  const symbol = useSelector((state: AppState) => state.nftSetup.symbol)
  const externalUrl = useSelector(
    (state: AppState) => state.nftSetup.externalUrl,
  )
  const description = useSelector(
    (state: AppState) => state.nftSetup.description,
  )

  const dispatch = useDispatch()

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Typography.Text type="secondary">SYMBOL</Typography.Text>
          <Input
            placeholder="Enter a symbol"
            value={symbol}
            onChange={(e) => dispatch(setSymbol(e.target.value))}
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Typography.Text type="secondary">EXTERNAL URL</Typography.Text>
          <Input
            placeholder="Enter link"
            value={externalUrl}
            onChange={(e) => dispatch(setExternalUrl(e.target.value))}
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Typography.Text type="secondary">DESCRIPTION</Typography.Text>
          <Input.TextArea
            placeholder="Write a summary"
            value={description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            rows={3}
          />
        </Space>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Button
              ghost
              block
              onClick={() =>
                dispatch(setCurrentStep(NFTCreatingStep.information))
              }
            >
              Back
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              block
              onClick={() =>
                dispatch(setCurrentStep(NFTCreatingStep.properties))
              }
            >
              Next
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default MetadataStep
