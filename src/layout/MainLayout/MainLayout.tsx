import React, { useState } from 'react';
import {
    AudioOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { layoutData } from '../data/layoutdata';
import { Link, Outlet } from 'react-router-dom';
import "../layout.scss"
import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';

const { Header, Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { Search } = Input;
    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1677ff',
            }}
        />
    );
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    return (
        <Layout className='layout'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu theme='dark' className='layout__menu'>
                    {layoutData.map((items: any) => (
                        <Menu.Item key={items.id} className='layout__list'>
                            <items.icon className="icons" />
                            <Link to={items.path}>
                                {items.name}
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Link to={"/home"} className='logo'>Adminka</Link>
                    <div className="input">
                        <Search
                            placeholder="input search text"
                            enterButton="Search"
                            size="large"
                            suffix={suffix}
                            onSearch={onSearch}
                        />
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

