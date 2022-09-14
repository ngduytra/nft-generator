import { Card, Col, Row, Space, Typography } from 'antd'
import Layout from 'component/layout'
import GenSPLToken from 'action/genSPLToken'

const dummyArray = [1, 2, 3]

const SPLToken = () => {
  return (
    <Layout>
      <Row gutter={[24, 24]} justify="center">
        <Col span={24}>
          <Typography.Title className="text-center">SPL Token</Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Title className="text-center">
            Create a SPL Token with metadata
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Space style={{ width: '100%' }} direction="vertical" align="center">
            <GenSPLToken />
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
                    <Typography.Text>SPL Token {val}</Typography.Text>
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

export default SPLToken
