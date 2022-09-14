import GenNFT from 'action/genNFT'
import { Card, Col, Row, Space, Typography } from 'antd'
import Layout from 'component/layout'

const dummyArray = [1, 2, 3]

const NFT = () => {
  return (
    <Layout>
      <Row gutter={[24, 24]} justify="center">
        <Col span={24}>
          <Typography.Title className="text-center">NFT</Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Title className="text-center">
            Create a NFT
          </Typography.Title>
        </Col>

        <Col span={24}>
          <Space style={{ width: '100%' }} align="center" direction="vertical">
            <GenNFT />
          </Space>
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
                    <Typography.Text>NFT {val}</Typography.Text>
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

export default NFT
