import React, { useState } from 'react'

import { Button, Col, Row, Modal } from 'antd'
import NFTContent from './nftContent'

const GenNFT = () => {
  const [visible, setVisible] = useState(false)

  return (
    <Row>
      <Col>
        <Button onClick={() => setVisible(true)}>Gen NFT</Button>
      </Col>
      <Modal
        visible={visible}
        destroyOnClose={true}
        onCancel={() => setVisible(false)}
        footer={null}
        centered={true}
      >
        <NFTContent />
      </Modal>
    </Row>
  )
}

export default GenNFT
