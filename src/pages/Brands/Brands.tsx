import { Button, Image, message, Table, TableProps } from 'antd';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { useGetBrands } from './service/query/useGetBrands';
import { useMutateBrands } from './service/mutate/useMutateBrands';
import { ClientQuery } from '../../config/queryClient';
import "./sass/brand.scss"

export const Brands = () => {
    const { mutate } = useMutateBrands()
    const { data } = useGetBrands()    

    const handleDelete = (id: number) => {
        mutate(id, {
            onSuccess: () => {
                message.success("Sizning habaringiz ochirildi");
                ClientQuery.invalidateQueries({ queryKey: ["brands"] });
            },
        });
    };
    const dataSource = data
        ? data?.results.map((product: any) => ({
            key: nanoid(),
            name: product.title,
            id: product.id,
            img: product.image,
            change: (
                <div>
                    <Button type="primary" onClick={() => handleDelete(product.id)}>
                        Delete
                    </Button>
                    <Link to={`/home/edit-brands/${product.id}`}>
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
                <Link to={"/home/createBrands"} >
                    <Button type='primary'>Create</Button>
                </Link>
            </div>
            <Table columns={columns} dataSource={dataSource} />
        </div>
    )
}
