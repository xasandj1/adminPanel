import React, { BaseSyntheticEvent, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { layoutData } from '../data/layoutdata';
import { Link, Outlet } from 'react-router-dom';
import "../layout.scss"
import { useSearch } from '../service/Mutate/useSearchMutate';
import useDebounce from './MainDebaunce';
import "../layout.scss"
import { nanoid } from 'nanoid';

const { Header, Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [value, setValue] = useState<any>("")
    const setInput = useDebounce(value)
    const { data } = useSearch(setInput)
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    
    const changeValue = (e: BaseSyntheticEvent) => {
        if (e.target.value?.length > 1) {
            setValue(e.target.value)
        }
        if (e.target.value <= 1) {
            setValue("")
        }

    }
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
                    <div className='search_div'>
                        <input
                            className='search'
                            type="text"
                            placeholder='Search Product'
                            onChange={changeValue}
                        />
                        <SearchOutlined style={{ fontSize: "20px" }} className='icons__search' />
                    </div>
                    {
                        value.length > 1 ?
                            <div className='product_div'>
                                {data?.results?.map((item: any) =>
                                (
                                    <Link to={`edit-category/${item.id}`} key={nanoid()} className=''>
                                        <div className='product_block'>
                                            <div>
                                                <img className='filter__img' src={item.image} alt="" />
                                            </div>
                                            <h2 className='filter__title'>{item.title}</h2>
                                        </div>
                                    </Link>
                                )
                                )}
                            </div>
                            : ""
                    }
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

