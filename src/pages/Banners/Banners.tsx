// import { useGetCategory } from '../service/Query/useGetCategory'
import { Button, Image, message, Table } from 'antd';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { mutateDeleteBanner } from './service/Mutation/mutateDeleteBanner';
import { useGetBanner } from './service/Query/useGetBanner';
import { ClientQuery } from '../../config/queryClient';

export const Banners: React.FC = () => {
    const { mutate } = mutateDeleteBanner()
    const { data: products } = useGetBanner()

    const handleDelete = (id: number) => {
        mutate(id, {
            onSuccess: () => {
                message.success("Sizning habaringiz ochirildi");
                ClientQuery.invalidateQueries({ queryKey: ["banner"] });
            },
        });
    };
    const dataSource = products? products?.map((product: any) => ({
            key: product.id.toString(),
            name: product.title,
            id: product.id,
            img: product.image,
            change: (
                <div>
                    <Button type="primary" onClick={() => handleDelete(product.id)}>
                        Delete
                    </Button>
                    <Link to={`/home/edit-banner/${product.id}`}>
                        <Button type="primary" style={{ marginLeft: "10px" }}>Edit</Button>
                    </Link>
                </div>
            ),
        }))
        : [];

    const columns: TableProps<{}>["columns"] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "IMG",
            key: "img",
            render: (dataSource) => {
                return <Image src={dataSource.img} width={"100px"} height={"100px"} style={{ objectFit: "contain" }} />;
            },
        },
        {
            title: "Category Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Change",
            dataIndex: "change",
            key: "change",
        },
    ];

    return (
        <div>
            <div className='create__button'>
                <Link to={"/home/createBanners"} >
                    <Button type='primary'>Create</Button>
                </Link>
            </div>
            <Table columns={columns} dataSource={dataSource} />
        </div>
    )
};