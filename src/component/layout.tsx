import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Row, Segmented } from 'antd'

import { AppState } from 'model'
import { setHomeTab } from 'model/main.controller'

import { HOME_TAB } from 'constant'
import { useAppRouter } from 'hooks/useAppRouter'

type LayoutProps = { children: any; loading?: boolean }

const Layout = ({ loading, children }: LayoutProps) => {
  const homeTab = useSelector((state: AppState) => state.main.homeTab)
  const dispatch = useDispatch()
  const { pushHistory } = useAppRouter()
  return (
    <Row justify="center" style={{ paddingBottom: 12 }}>
      <Col lg={12}>
        <Row gutter={[60, 60]} justify="center">
          <Col span={24}>
            <Row justify="center">
              <Col>
                <Segmented
                  options={Object.entries(HOME_TAB).map(([key, val]) => {
                    return { label: key, value: val }
                  })}
                  value={homeTab}
                  onChange={async (val) => {
                    dispatch(setHomeTab(val.toString()))
                    pushHistory(`/${val.toString()}`)
                  }}
                  block
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>{children} </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Layout
