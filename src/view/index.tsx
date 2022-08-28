import { Redirect, Route, Switch } from 'react-router-dom'
import { FC, useMemo } from 'react'

import { Row, Col } from 'antd'
import NFT from './nft'
import Collection from './collection'
import { useAppRouter } from 'hooks/useAppRouter'
// import {
//   DialectUiManagementProvider,
//   DialectContextProvider,
//   DialectThemeProvider,
//   DialectWalletAdapter,
//   Config,
//   Backend,
// } from '@dialectlabs/react-ui'

// import Notification from 'component/notification'

import './index.less'
// import '@dialectlabs/react-ui/index.css'
// import { WalletContextState, useWallet } from '@solana/wallet-adapter-react'
// import { PROJECT_PUBLIC_KEY } from 'constant'

// const convertWalletForDialect = (
//   wallet: WalletContextState,
// ): DialectWalletAdapter => {
//   let clonedWallet: any = {}
//   if (wallet.publicKey === null) clonedWallet.publicKey = undefined
//   return { ...wallet, ...clonedWallet }
// }

// const DialectProviders: FC = ({ children }) => {
//   const wallet = useWallet()
//   const dialectWallet = useMemo(() => convertWalletForDialect(wallet), [wallet])
//   const dialectConfig = useMemo(
//     (): Config => ({
//       backends: [Backend.DialectCloud, Backend.Solana],
//       environment: 'production',
//     }),
//     [],
//   )

//   return (
//     // We are missing some props for now, we will add them in the next step
//     <DialectContextProvider
//       wallet={dialectWallet}
//       config={dialectConfig}
//       dapp={PROJECT_PUBLIC_KEY}
//       autoConnect
//     >
//       <DialectThemeProvider>
//         <DialectUiManagementProvider>{children}</DialectUiManagementProvider>
//       </DialectThemeProvider>
//     </DialectContextProvider>
//   )
// }

const View = () => {
  const { appRoute } = useAppRouter()

  return (
    // <DialectProviders>
    <Row gutter={[24, 24]} align="middle" justify="center">
      <Col span={24}>
        <Switch>
          <Route path={`${appRoute}/nft`} component={NFT} />
          <Route path={`${appRoute}/collection`} component={Collection} />
          <Route path="*">
            <Redirect to={`${appRoute}/nft`} />
          </Route>
        </Switch>
      </Col>
      {/* <Notification /> */}
    </Row>
    // </DialectProviders>
  )
}

export default View
