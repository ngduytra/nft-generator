import React, { useCallback, useState, useEffect } from 'react'
import { util } from '@sentre/senhub'
import { NftTokenAccount } from '@nfteyez/sol-rayz-react'

import { Col, Row, Image, Space, Typography } from 'antd'

import { fetchMetadata } from 'helper'
import { useAppRouter } from 'hooks/useAppRouter'
import Dummy from '../static/images/dummy.png'

type NFTCardProps = {
  nftInfo: NftTokenAccount
}

const NftCard = ({ nftInfo }: NFTCardProps) => {
  const { pushHistory } = useAppRouter()
  const [nftThumnail, setNFTThumnail] = useState('')

  const getNFTThumbnail = useCallback(async () => {
    const data = await fetchMetadata(nftInfo.data.uri)
    setNFTThumnail(data.image)
  }, [nftInfo.data.uri])

  useEffect(() => {
    getNFTThumbnail()
  }, [getNFTThumbnail])

  return (
    <Row
      gutter={[8, 8]}
      justify="center"
      onClick={() => pushHistory(`/updateNFT/${nftInfo.mint}`)}
    >
      <Col>
        <Image
          src={nftThumnail || Dummy}
          preview={false}
          style={{ borderRadius: 12, aspectRatio: '1' }}
        />
      </Col>
      <Col span={24}>
        <Row>
          <Col>
            <Typography.Text>{nftInfo?.data?.name}</Typography.Text>
          </Col>
          <Col flex={1}>
            <Space direction="vertical" align="end" style={{ width: '100%' }}>
              {util.shortenAddress(nftInfo.mint)}
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default NftCard
