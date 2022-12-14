import React, { useEffect, useState } from 'react'

import { HomeOutlined, CarOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

import styles from './index.module.less'

interface SiderMenuProps {
  collapsedWidth?: number
  siderWidth?: number
}

const { Sider } = Layout

const menuItems = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>
  },
  {
    key: '/geo',
    icon: <EnvironmentOutlined />,
    label: <Link to="/Geo">Geo</Link>
  },
  {
    key: '/nyctaxi',
    icon: <CarOutlined />,
    label: <Link to="/nyctaxi">NYCTaxi</Link>
  }
]

const defaultProps = {
  collapsedWidth: 48,
  siderWidth: 200
}

const getMenuKey = (pathname: string) => {
  return pathname
}

function SiderMenu(props: SiderMenuProps) {
  const { siderWidth, collapsedWidth } = { ...defaultProps, ...props }
  const [collapsed, setCollapsed] = useState<boolean>(true)

  const location = useLocation()

  const [current, setcurrent] = useState<string>(getMenuKey(location.pathname))

  useEffect(() => {
    setcurrent(getMenuKey(location.pathname))
  }, [location.pathname])

  return (
    <>
      <div
        style={{
          width: collapsed ? collapsedWidth : siderWidth,
          overflow: 'hidden',
          flex: `0 0 ${collapsed ? collapsedWidth : siderWidth}px`,
          maxWidth: collapsed ? collapsedWidth : siderWidth,
          minWidth: collapsed ? collapsedWidth : siderWidth,
          transition: 'all 0.2s ease 0s'
        }}
      />
      <Sider
        collapsible
        breakpoint="lg"
        className={styles.sider}
        collapsed={collapsed}
        collapsedWidth={collapsedWidth}
        theme="light"
        width={siderWidth}
        onCollapse={setCollapsed}
      >
        {/* <div className="logo" /> */}
        <div style={{ flex: '1 1 0%', overflow: 'hidden auto' }}>
          <Menu
            className={styles.menu}
            items={menuItems}
            mode="inline"
            selectedKeys={[current]}
            style={{ height: '100%', borderRight: 0 }}
          />
        </div>
      </Sider>
    </>
  )
}

export default SiderMenu
