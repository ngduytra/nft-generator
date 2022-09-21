import { useState } from 'react'
import {
  MetaplexFile,
  toMetaplexFileFromBrowser,
} from '@metaplex-foundation/js'
import { UploadChangeParam } from 'antd/lib/upload/interface'

import {
  Col,
  Input,
  Row,
  Space,
  Switch,
  Typography,
  Image,
  Button,
  Upload,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { beforeUpload, fileToBase64 } from 'helper'
import { useGenSplToken } from 'hooks/actions/useGenSplToken'

const SPLContent = () => {
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [supply, setSupply] = useState('')
  const [decimal, setDecimal] = useState('')
  const [metadataURL, setMetadataUrl] = useState('')
  const [displayedImage, setDisplayedImage] = useState<
    string | ArrayBuffer | null
  >('')
  const [freezeAuthority, setFreezeAuthority] = useState(false)
  const [hasMetadataURL, setHasMetadataURL] = useState(false)
  const [image, setImage] = useState<MetaplexFile | string>('')
  const [hasImageURL, setHasImageURL] = useState(false)
  const [description, setDescription] = useState('')
  const { genSplToken, loading } = useGenSplToken()

  const onChangeImage = async (file: UploadChangeParam) => {
    const { fileList } = file
    const originFile = fileList[0].originFileObj as File
    const metaplexImage = await toMetaplexFileFromBrowser(originFile)
    fileToBase64(originFile, (imgBase64: string | ArrayBuffer | null) => {
      setImage(metaplexImage)
      setDisplayedImage(imgBase64)
      return
    })
  }

  const onGenerate = async () => {
    genSplToken({
      name,
      symbol,
      description,
      supply: Number(supply),
      decimal: Number(decimal),
      hasMetadataURL,
      metadataURL,
      image,
      freezeAuthority,
    })
  }

  return (
    <Row gutter={[24, 24]}>
      <Col>
        <Typography.Title level={4}>Token Infos</Typography.Title>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Typography.Text type="secondary">NAME</Typography.Text>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name of token"
              />
            </Space>
          </Col>
          <Col span={24}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Typography.Text type="secondary">SYMBOL</Typography.Text>
              <Input
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter symbol"
              />
            </Space>
          </Col>
          <Col span={24}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Typography.Text type="secondary">NUMBER</Typography.Text>
              <Input
                value={supply}
                onChange={(e) => setSupply(e.target.value)}
                placeholder="Enter number of tokens to mint"
              />
            </Space>
          </Col>
          <Col span={24}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Typography.Text type="secondary">DECIMAL</Typography.Text>
              <Input
                value={decimal}
                onChange={(e) => setDecimal(e.target.value)}
                placeholder="Enter decimal"
              />
            </Space>
          </Col>
          <Col span={24}>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Row>
                  <Col>
                    <Typography.Text type="secondary">IMAGE</Typography.Text>
                  </Col>
                  <Col flex="auto">
                    <Row justify="end" gutter={[6, 6]}>
                      <Col>
                        <Typography.Text>Had Image Url?</Typography.Text>{' '}
                      </Col>
                      <Col>
                        <Switch
                          checked={hasImageURL}
                          onChange={() => setHasImageURL(!hasImageURL)}
                          size="small"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                {hasImageURL && typeof image === 'string' ? (
                  <Input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                ) : displayedImage ? (
                  <Row gutter={[8, 8]}>
                    <Col span={24}>
                      <Image
                        src={displayedImage.toString() || ''}
                        preview={false}
                        width={64}
                        height={64}
                        style={{ borderRadius: 8 }}
                      />
                    </Col>
                    <Col>
                      <Button
                        onClick={() => {
                          setImage('')
                          setDisplayedImage('')
                        }}
                        size="small"
                      >
                        Remove Image
                      </Button>
                    </Col>
                  </Row>
                ) : (
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    accept="image/png,image/jpg,image/webp"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={onChangeImage}
                    maxCount={1}
                    onRemove={() => {
                      setImage('')
                      return true
                    }}
                  >
                    <IonIcon name="add-outline" />
                  </Upload>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row>
          <Col>
            <Typography.Title level={5}>Metadata</Typography.Title>
          </Col>
          <Col flex="auto">
            <Space style={{ width: '100%' }} direction="vertical" align="end">
              <Switch
                checked={hasMetadataURL}
                onChange={() => setHasMetadataURL(!hasMetadataURL)}
                size="small"
              />
            </Space>
          </Col>
        </Row>
        {hasMetadataURL ? (
          <Row>
            <Col span={24}>
              <Typography.Text>URL</Typography.Text>
              <Input
                value={metadataURL}
                onChange={(e) => {
                  setMetadataUrl(e.target.value)
                }}
              />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col span={24}>
              <Typography.Text type="secondary">DESCRIPTION</Typography.Text>
              <Input.TextArea
                placeholder="Description of the token/project"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                rows={3}
              />
            </Col>
          </Row>
        )}
      </Col>
      <Col span={24}>
        <Row>
          <Col>
            <Typography.Title level={5}> Authority</Typography.Title>
          </Col>
          <Col flex="auto">
            <Space style={{ width: '100%' }} direction="vertical" align="end">
              <Switch
                checked={freezeAuthority}
                onChange={() => setFreezeAuthority(!freezeAuthority)}
                size="small"
              />
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Button block loading={loading} type="primary" onClick={onGenerate}>
          Generate
        </Button>
      </Col>
    </Row>
  )
}

export default SPLContent
