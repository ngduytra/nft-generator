import GenNFT from 'action/genNFT'
import { Col, Row, Space, Typography } from 'antd'
import Layout from 'component/layout'
import NftCard from 'component/nftCard'

const dummyArray = [1, 2, 3]

const NFT = () => {
  return (
    <Layout>
      <Row justify="center">
        <Col span={24}>
          <Row>
            <Col>
              <Typography.Title level={2}>Your NFT</Typography.Title>
            </Col>
            <Col flex={1}>
              <Space style={{ width: '100%' }} align="end" direction="vertical">
                <GenNFT />
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            {dummyArray.map((val, index) => (
              <Col span={8} key={index}>
                <NftCard />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}

export default NFT
