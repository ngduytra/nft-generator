// import { useDialectWallet } from '@dialectlabs/react-ui'
// import { useWalletAddress } from '@sentre/senhub/dist'
// import { PublicKey } from '@solana/web3.js'

import GenNFT from 'action/genNFT'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import Layout from 'component/layout'

// import { useNotification } from 'hooks/useNotocation'
// import { NotifySubscription } from 'lib/notification'

const dummyArray = [1, 2, 3]

const NFT = () => {
  // const walletAddress = useWalletAddress()
  // const notification = useNotification()

  // console.log('walletAddress: ', walletAddress)

  // const subscribeNotification = async () => {
  //   if (!notification) return
  //   const newAddress = await notification.createNewAddress()
  //   if (!newAddress) return
  //   const subscription = await notification.subscribeDappNotification(
  //     newAddress.id,
  //     notification._dappInstance.publicKey,
  //   )
  //   let code = prompt('Verified code?')
  //   const verifiedAddress = await notification.verifyAddress(
  //     newAddress.id,
  //     code || '',
  //   )
  //   console.log('Verify successfully!: ', verifiedAddress)
  //   console.log('subcribe not successfully!', subscription)
  //   const sendNoti = await notification?._dappInstance.messages.send({
  //     title: 'Hello, this is the first title',
  //     message: 'Message i want to give out is that, we have many choices',
  //     recipient: new PublicKey('GJLqpmDxxrV9xruee2vFvEoTho7VVQHRtuHH8nfoAE54'),
  //   })
  //   console.log(sendNoti, ' Send noti thanh cong!')
  // }
  // const sendNotification = async () => {
  //   try {
  //     const notification = new NotifySubscription()
  //     const a = await notification.sendNotification()
  //     console.log('da gui thanh cong: ', a)
  //   } catch (err) {
  //     console.log('error:', err)
  //   }
  // }

  return (
    <Layout>
      <Row gutter={[24, 24]} justify="center">
        <Col span={24}>
          <Typography.Title className="text-center">NFT</Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Title className="text-center">
            This is a collection from Divegent agent
          </Typography.Title>
        </Col>
        {/* <Col span={24}>
          <Button onClick={() => {}}>Send noti</Button>
        </Col>
        <Col span={24}>
          <Button onClick={subscribeNotification}>Subscribe</Button>
        </Col> */}
        <Col span={24}>
          <Space style={{ width: '100%' }} align="center" direction="vertical">
            <GenNFT />
            {/* <Button
              style={{
                background: 'linear-gradient(rgb(0 255 3 / 58%), transparent)',
                color: 'Highlight',
              }}
              onClick={async () => {
                if (!nftMachine) return
                const nftList = await nftMachine.findAllNftsByOwner(
                  walletAddress,
                )
                console.log('firstNft: ', nftList[0].address.toBase58())
              }}
            >
              Fetch NFT
            </Button>
            <Button
              style={{
                background: 'linear-gradient(rgb(0 255 3 / 58%), transparent)',
                color: 'Highlight',
              }}
              onClick={async () => {
                if (!nftMachine) return
                const mintInfo = await nftMachine.findByMint(
                  new PublicKey('8vMxxi91AQMSN6wUGDyYxeHStV1C5bx8Yhz14CB8tu6C'),
                )
                console.log('mintInfo: ', mintInfo)
              }}
            >
              Fetch NFT By Mint
            </Button> */}
          </Space>
        </Col>
        <Col span={24}>
          <Space size={8} style={{ width: '100%' }} direction="vertical">
            {dummyArray.map((val, index) => (
              <Card
                key={index}
                style={{
                  background: 'linear-gradient(180deg, #00ffee59, transparent)',
                }}
              >
                <Row>
                  <Col>
                    <Typography.Text>NFT {val}</Typography.Text>
                  </Col>
                </Row>
              </Card>
            ))}
          </Space>
        </Col>
      </Row>
    </Layout>
  )
}

export default NFT
