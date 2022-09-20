import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Col, Row, Space, Typography } from 'antd'
import Layout from 'component/layout'
import GenSPLToken from 'action/genSPLToken'
import NftCard from 'component/nftCard'

import { setHomeTab } from 'model/main.controller'
import { HOME_TAB } from 'constant'

const dummyArray = [1, 2, 3]

const SPLToken = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setHomeTab(HOME_TAB.TOKEN))
  })

  return (
    <Layout>
      <Row justify="center">
        <Col span={24}>
          <Row>
            <Col>
              <Typography.Title level={2}>Your Token</Typography.Title>
            </Col>
            <Col flex={1}>
              <Space style={{ width: '100%' }} direction="vertical" align="end">
                <GenSPLToken />
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            {dummyArray.map((val, index) => (
              <Col span={8}>
                <NftCard />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}

export default SPLToken
