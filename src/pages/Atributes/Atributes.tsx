import React from 'react';
import { Button, Image, message, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { nanoid } from 'nanoid';
import { useGetAtribute } from './service/Query/useGetAtribute';
import { Link } from 'react-router-dom';
import { useMutateAttribute } from './service/Mutate/useMutateAtribute';
import { ClientQuery } from '../../config/queryClient';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}


export const Atributes: React.FC = () => {
  const { data } = useGetAtribute()
  const { mutate } = useMutateAttribute()
  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("Sizning habaringiz ochirildi");
        ClientQuery.invalidateQueries({ queryKey: ["attribute"] });
      },
    });
  };
  console.log(data);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
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
  const dataSource = data
    ? data?.results.map((product: any) => ({
      key: nanoid(),
      name: product.title,
      id: product.id,
      img: product.image,
      change: (
        <div>
          <Link to={`/home/edit-brands/${product.id}`}>
            <Button type="primary" >Edit</Button>
          </Link>
          <Button type="primary" style={{ marginLeft: "10px" }} onClick={() => handleDelete(product.id)}>
            Delete
          </Button>
        </div>
      ),
    }))
    : [];

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
    </>
  )
};

