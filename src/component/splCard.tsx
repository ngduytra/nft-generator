import React, { useCallback, useState } from 'react'
import { util } from '@sentre/senhub'
import { PublicKey } from '@solana/web3.js'

import { Col, Row, Image, Space, Typography } from 'antd'
import IconFT from './iconFT'
import NameFT from './nameFT'

import { useEffect } from 'react'
import { useMetaplex } from 'hooks/useMetaplex'

type NFTCardProps = {
  address: string
}

const SPLCard = ({ address }: NFTCardProps) => {
  const [splThumnail, setSPLThumnail] = useState('')
  const [name, setName] = useState('')
  const metaplex = useMetaplex()

  const getTokenInfo = useCallback(async () => {
    const nft = await metaplex?.findByMint(new PublicKey(address))
    const logo = nft?.json?.image
    const newName = nft?.json?.name

    if (logo !== undefined) {
      setSPLThumnail(logo)
    }
    if (newName !== undefined) {
      setName(newName)
    }
  }, [address, metaplex])

  useEffect(() => {
    getTokenInfo()
  }, [getTokenInfo])

  return (
    <Row gutter={[8, 8]} justify="center">
      <Col>
        {splThumnail ? (
          <Image
            src={splThumnail}
            preview={false}
            style={{ borderRadius: 12, aspectRatio: '1' }}
          />
        ) : (
          <IconFT address={address} />
        )}
      </Col>
      <Col span={24}>
        <Row wrap={false}>
          <Col span={8}>
            {name ? (
              <Typography.Text ellipsis>{name}</Typography.Text>
            ) : (
              <NameFT address={address} />
            )}
          </Col>
          <Col flex={1}>
            <Space direction="vertical" align="end" style={{ width: '100%' }}>
              {util.shortenAddress(address)}
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default SPLCard
