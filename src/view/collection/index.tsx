import React from 'react'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import Layout from 'component/layout'

const dummyArray = [1, 2, 3]

const Collection = () => {
  return (
    <Layout>
      <Row gutter={[24, 24]} justify="center">
        <Col span={24}>
          <Typography.Title className="text-center">
            Collection
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Title className="text-center">
            This is a collection from Divegent agent
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Button type="primary">Gen Collection</Button>
        </Col>
        <Col span={24}>
          <Space size={8} style={{ width: '100%' }} direction="vertical">
            {dummyArray.map((val, index) => (
              <Card
                key={index}
                style={{
                  background: 'linear-gradient(180deg, #00ffee59, transparent)',
                }}
              >
                <Row>
                  <Col>
                    <Typography.Text>Collection {val}</Typography.Text>
                  </Col>
                </Row>
              </Card>
            ))}
          </Space>
        </Col>
      </Row>
    </Layout>
  )
}

export default Collection
