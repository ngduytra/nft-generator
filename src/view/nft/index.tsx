import { useWalletNfts } from '@nfteyez/sol-rayz-react'
import { useWalletAddress } from '@sentre/senhub/dist'

import GenNFT from 'action/genNFT'
import { Col, Row, Space, Typography } from 'antd'
import Layout from 'component/layout'
import Loading from 'component/loading'
import NftCard from 'component/nftCard'

import configs from 'configs'

const {
  sol: { connection },
} = configs

const NFT = () => {
  const walletAddress = useWalletAddress()
  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletAddress,
    connection,
  })

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
        {error && <Col>Can't load NFT</Col>}
        <Col span={24}>
          {isLoading ? (
            <Loading />
          ) : (
            <Row gutter={[24, 24]}>
              {nfts?.map((nft, index) => (
                <Col xl={6} sm={8} xs={12} key={index}>
                  <NftCard nftInfo={nft} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Layout>
  )
}

export default NFT
