import { Button, Image, message, Table } from 'antd';
import type { TableProps } from 'antd';
import { ClientQuery } from '../../config/queryClient';
import { Link } from 'react-router-dom';
import { useGetProducts } from './service/Query/useGetProducts';
import { mutateDleteProducts } from './service/Mutation/mutateDleteProducts';

export const Products: React.FC = () => {
    const { mutate } = mutateDleteProducts()
    const { data: products } = useGetProducts()

    const handleDelete = (id: number) => {
        mutate(id, {
            onSuccess: () => {
                message.success("Sizning habaringiz ochirildi");
                ClientQuery.invalidateQueries({ queryKey: ["product"] });
            },
        });
    };
    const dataSource = products
        ? products.map((product: any) => ({
            key: product.id.toString(),
            name: product.title,
            id: product.id,
            img: product.image,
            change: (
                <div>
                    <Button type="primary" onClick={() => handleDelete(product.id)}>
                        Delete
                    </Button>
                    <Link to={`/home/edit-product/${product.id}`}>
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
            title: "Product Name",
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
            <Link to={"/home/createProducts"}>
                <Button>Create</Button>
            </Link>
            <br />
            <br />
            <Table columns={columns} dataSource={dataSource} />
        </div>
    )
};