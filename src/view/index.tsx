import { Redirect, Route, Switch } from 'react-router-dom'

import { Row, Col } from 'antd'
import NFT from './nft'
import Collection from './collection'
import { useAppRouter } from 'hooks/useAppRouter'

import './index.less'

const View = () => {
  const { appRoute } = useAppRouter()

  return (
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
    </Row>
  )
}

export default View
