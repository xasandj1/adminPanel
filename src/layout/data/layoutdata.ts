import { BarsOutlined, DingdingOutlined, FolderOutlined, FormatPainterOutlined, LogoutOutlined, } from '@ant-design/icons'
export const layoutData = [
    {
        id: "1",
        name: 'Category-List',
        path: "/home",
        icon: FolderOutlined,

    },
    {
        id: "3",
        icon: BarsOutlined,
        name: 'SubCategory-List',
        path: "subcategory"
    },
    {
        id: "4",
        icon: DingdingOutlined,
        name: 'Brands',
        path: "brands"
    },
    {
        id: "5",
        icon: FormatPainterOutlined,
        name: 'Attribute',
        path: "attribute"
    },
    {
        id: "6",
        icon: LogoutOutlined,
        name: 'Logout',
        path: "/home"
    },
]