import { BarsOutlined, DingdingOutlined, FolderOpenOutlined, FolderOutlined, LoadingOutlined, LogoutOutlined, } from '@ant-design/icons'
export const layoutData = [
    {
        id: "1",
        name: 'Category-List',
        path: "/home",
        icon: FolderOutlined,

    },
    {
        id: "2",
        icon: BarsOutlined,
        name: 'SubCategory-List',
        path: "subcategory"
    },
    {
        id: "3",
        icon: DingdingOutlined,
        name: 'Brands',
        path: "brands"
    },
   
    {
        id: "5",
        icon: FolderOpenOutlined,
        name: 'Products',
        path: "products"
    },
    {
        id: "6",
        icon: LoadingOutlined,
        name: 'Banners',
        path: "banner"
    },
    {
        id: "7",
        icon: LogoutOutlined,
        name: 'Logout',
        path: "/"
    },
]