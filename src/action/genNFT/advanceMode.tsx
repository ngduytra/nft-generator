// import React, { Fragment, useState } from 'react'
// import {
//   Col,
//   Input,
//   InputNumber,
//   Row,
//   Space,
//   Switch,
//   Tooltip,
//   Typography,
// } from 'antd'
// import { CreatorInput } from '@metaplex-foundation/js'
// import IonIcon from '@sentre/antd-ionicon'

// const AdvanceMode = () => {
//   const [payer, setPayer] = useState('')
//   const [authority, setAuthority] = useState('')
//   const [mintAuthority, setMintAuthority] = useState('')
//   const [newMint, setNewMint] = useState('')
//   const [existMint, setExistMint] = useState('')
//   const [tokenOwner, setTokenOwner] = useState('')
//   const [tokenAddress, setTokenAddress] = useState('')
//   const [symbol, setSymbol] = useState('')
//   const [creators, setCreators] = useState<CreatorInput[]>([])
//   const [isMutable, setIsMutable] = useState(false)
//   const [maxSupply, setMaxSupply] = useState(0)
//   const [isCollection, setIsCollection] = useState(false)
//   const [collection, setCollection] = useState('')
//   const [collectionAuthority, setCollectionAuthority] = useState('')
//   const [tokenProgram, setTokenProgram] = useState('')

//   return (
//     <Fragment>
//       <Col span={24}>
//         <Space style={{ width: '100%' }} align="center">
//           <Typography.Title level={5}>Payer</Typography.Title>
//           <Tooltip title="">
//             <IonIcon name="information-circle-outline" />
//           </Tooltip>
//         </Space>
//         <Input
//           placeholder="Your Put, Their Thought"
//           value={payer}
//           onChange={(e) => setPayer(e.target.value)}
//         />
//       </Col>
//       <Col span={24}>
//         <Space style={{ width: '100%' }} align="center">
//           <Typography.Title level={5}>Authority</Typography.Title>
//           <Tooltip title="">
//             <IonIcon name="information-circle-outline" />
//           </Tooltip>
//         </Space>
//         <Input
//           placeholder="Your Put, Their Thought"
//           value={authority}
//           onChange={setAuthority}
//         />
//       </Col>
//       <Col span={24}>
//         <Space style={{ width: '100%' }} align="center">
//           <Typography.Title level={5}>Mint Authority</Typography.Title>
//           <Tooltip title="">
//             <IonIcon name="information-circle-outline" />
//           </Tooltip>
//         </Space>
//         <Input
//           placeholder="Your Put, Their Thought"
//           value={mintAuthority}
//           onChange={setMintAuthority}
//         />
//       </Col>
//       <Col span={24}>
//         <Space style={{ width: '100%' }} align="center">
//           <Typography.Title level={5}>New Mint</Typography.Title>
//           <Tooltip title="">
//             <IonIcon name="information-circle-outline" />
//           </Tooltip>
//         </Space>
//         <Input
//           placeholder="Your Put, Their Thought"
//           value={newMint}
//           onChange={setNewMint}
//         />
//       </Col>
//       <Col span={24}>
//         <Space style={{ width: '100%' }} align="center">
//           <Typography.Title level={5}>Token Owner</Typography.Title>
//           <Tooltip title="">
//             <IonIcon name="information-circle-outline" />
//           </Tooltip>
//         </Space>
//         <Input
//           placeholder="Your Put, Their Thought"
//           value={tokenOwner}
//           onChange={setTokenOwner}
//         />
//       </Col>
//       <Col span={24}>
//         <Space style={{ width: '100%' }} align="center">
//           <Typography.Title level={5}>Token Address</Typography.Title>
//           <Tooltip title="">
//             <IonIcon name="information-circle-outline" />
//           </Tooltip>
//         </Space>
//         <Input
//           placeholder="Your Put, Their Thought"
//           value={tokenAddress}
//           onChange={setTokenAddress}
//         />
//       </Col>
//       <Col span={24}>
//         <Space style={{ width: '100%' }} align="center">
//           <Typography.Title level={5}>Symbol</Typography.Title>
//           <Tooltip title="">
//             <IonIcon name="information-circle-outline" />
//           </Tooltip>
//         </Space>
//         <Input
//           placeholder="Your Put, Their Thought"
//           value={symbol}
//           onChange={setSymbol}
//         />
//       </Col>
//       <Col span={24}>
//         <Space style={{ width: '100%' }} align="center">
//           <Typography.Title level={5}>Creators</Typography.Title>
//           <Tooltip title="">
//             <IonIcon name="information-circle-outline" />
//           </Tooltip>
//         </Space>

//         {/* ToDo: Implement later */}
//         <Input
//           placeholder="Your Put, Their Thought"
//           value={payer}
//           onChange={setPayer}
//         />
//       </Col>
//       <Col span={24}>
//         <Space style={{ width: '100%' }} align="center">
//           <Typography.Title level={5}>Is Mutable</Typography.Title>
//           <Tooltip title="">
//             <IonIcon name="information-circle-outline" />
//           </Tooltip>
//         </Space>
//         <Switch checked={isMutable} onChange={() => setIsMutable(!isMutable)} />
//       </Col>
//       <Col span={24}>
//         <Space style={{ width: '100%' }} align="center">
//           <Typography.Title level={5}>Max Supply</Typography.Title>
//           <Tooltip title="">
//             <IonIcon name="information-circle-outline" />
//           </Tooltip>
//         </Space>
//         <InputNumber
//           placeholder="Your Put, Their Thought"
//           value={maxSupply}
//           onChange={setMaxSupply}
//         />
//       </Col>
//     </Fragment>
//   )
// }

// export default AdvanceMode
