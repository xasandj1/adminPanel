import { FolderOpenOutlined, FolderOutlined, ForkOutlined, LogoutOutlined, MergeOutlined, SolutionOutlined, UploadOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
export const layoutData = [
    {
        id: "1",
        name: 'Category-List',
        path: "/home",
        icon: FolderOutlined,

    },
    {
        id: "3",
        icon: FolderOpenOutlined,
        name: 'SubCategory-List',
        path: "subcategory"
    },
    {
        id: "4",
        icon: ForkOutlined ,
        name: 'Brands',
        path: "/home"
    },
    {
        id: "5",
        icon: UserAddOutlined,
        name: 'Profile',
        path: "/home"
    },
    {
        id: "6",
        icon: LogoutOutlined ,
        name: 'Logout',
        path: "/home"
    },
]