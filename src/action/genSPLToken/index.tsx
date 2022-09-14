import React, { useState } from 'react'

import { Button, Col, Row, Modal } from 'antd'
import SPLContent from './splContent'

const GenSPLToken = () => {
  const [visible, setVisible] = useState(false)

  return (
    <Row>
      <Col>
        <Button onClick={() => setVisible(true)}>Gen Token</Button>
      </Col>
      <Modal
        visible={visible}
        destroyOnClose={true}
        onCancel={() => setVisible(false)}
        footer={null}
        centered={true}
      >
        <SPLContent />
      </Modal>
    </Row>
  )
}

export default GenSPLToken
