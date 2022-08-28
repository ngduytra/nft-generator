import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Row, Segmented } from 'antd'

import { AppState } from 'model'
import { setHomeTab } from 'model/main.controller'

import { HOME_TAB } from 'constant'
import { useAppRoute } from '@sentre/senhub'
import { useAppRouter } from 'hooks/useAppRouter'

type LayoutProps = { children: any }

const Layout = ({ children }: LayoutProps) => {
  const homeTab = useSelector((state: AppState) => state.main.homeTab)
  const dispatch = useDispatch()
  const { pushHistory } = useAppRouter()
  return (
    <Row justify="center" style={{ paddingBottom: 12 }} className="ree">
      <Col span={12}>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={12} lg={6}>
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
          <Col span={24}>{children}</Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Layout
