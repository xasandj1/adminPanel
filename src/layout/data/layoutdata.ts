import { BarsOutlined, DingdingOutlined, FolderOpenOutlined, FolderOutlined, FormatPainterOutlined, LogoutOutlined, } from '@ant-design/icons'
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
        id: "4",
        icon: FormatPainterOutlined,
        name: 'Attribute',
        path: "attribute"
    },
    {
        id: "5",
        icon: FolderOpenOutlined,
        name: 'Products',
        path: "products"
    },
    {
        id: "6",
        icon: LogoutOutlined,
        name: 'Logout',
        path: "/"
    },
]