import React from 'react'
import { Col, Row, Image, Space, Typography } from 'antd'

const NftCard = () => {
  return (
    <Row className="nft-card" gutter={[8, 8]} justify="center">
      <Col>
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNh2kOz0Eya2FqnnalLUb2fA67f6aKu2sM4yBGE49RgpSFwUSw"
          preview={false}
          style={{ borderRadius: 12, aspectRatio: '1' }}
        />
      </Col>
      <Col span={24}>
        <Row>
          <Col>
            <Typography.Text>Monkey #12</Typography.Text>
          </Col>
          <Col flex={1}>
            <Space direction="vertical" align="end" style={{ width: '100%' }}>
              2312....2222
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default NftCard
