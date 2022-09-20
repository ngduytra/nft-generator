import React, { useState } from 'react'

import { Button, Col, Row, Modal, Typography } from 'antd'
import NFTContent from './nftContent'
import IonIcon from '@sentre/antd-ionicon'

const GenNFT = () => {
  const [visible, setVisible] = useState(false)

  return (
    <Row>
      <Col>
        <Button onClick={() => setVisible(true)} type="primary">
          <IonIcon name="add-outline" />
          <Typography.Text>Generate</Typography.Text>
        </Button>
      </Col>
      <Modal
        open={visible}
        destroyOnClose={true}
        onCancel={() => setVisible(false)}
        footer={null}
        closable={false}
        centered={true}
      >
        <NFTContent onCancel={() => setVisible(false)} />
      </Modal>
    </Row>
  )
}

export default GenNFT
