import React, { useState } from 'react'

import { Button, Col, Row, Modal } from 'antd'
import { ModalContent } from './modalContent'

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
        <ModalContent />
      </Modal>
    </Row>
  )
}

export default GenNFT
