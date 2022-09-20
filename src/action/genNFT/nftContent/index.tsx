import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Col, Row, Steps } from 'antd'
import InformationStep from './infomationStep'
import MetadataStep from './metadataStep'
import Properties from './properties'

import { AppState } from 'model'
import { NFTCreatingStep } from 'constant'

const { Step } = Steps

type NFTContentProps = {
  onCancel: () => void
}

const NFTContent = ({ onCancel }: NFTContentProps) => {
  const currentStep = useSelector(
    (state: AppState) => state.nftSetup.currentStep,
  )
  const creatingNFTProcess = useMemo(() => {
    switch (currentStep) {
      case NFTCreatingStep.information:
        return <InformationStep onCancel={onCancel} />
      case NFTCreatingStep.metadata:
        return <MetadataStep />

      case NFTCreatingStep.properties:
        return <Properties />
    }
  }, [currentStep, onCancel])

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Steps size="small" current={currentStep}>
          <Step title="Information" />
          <Step title="Metadata" />
          <Step title="Properties" />
        </Steps>
      </Col>

      <Col>{creatingNFTProcess}</Col>
    </Row>
  )
}

export default NFTContent
