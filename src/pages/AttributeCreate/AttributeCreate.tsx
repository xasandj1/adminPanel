import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutateCreateAttribute } from './service/Mutate/useMutateCreateAttribute';
import "./sass/attributeCreate.scss"

export interface CategoryData {
    title: string,
    category: number[],
    values: string[]
}

export interface SubItem {
    value: string;
}

export interface Item {
    name: string;
    list?: SubItem[];
}

export interface Payload {
    attr_list: CategoryData[];
}

export const AttributeCreate = ({ subCategoryId }: { subCategoryId: number }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutateCreateAttribute();

    const onFinish = (values: { items: Item[] }) => {
        console.log(values);
        const payload: Payload = {
            attr_list: values.items.map((item: Item) => ({
                title: item.name,
                category: [subCategoryId],
                values: item.list?.map((subItem: SubItem) => subItem.value) || []
            }))
        }

        mutate(payload, {
            onSuccess: () => {
                message.success("Success");
                navigate("/home/attribute");
            },
            onError: (error: any) => {
                console.error(error);
            },
        });
    };

    return (
        <div className="section">
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                form={form}
                name="dynamic_form_complex"
                style={{ maxWidth: 600 }}
                autoComplete="off"
                initialValues={{ items: [{}] }}
                onFinish={onFinish}
            >
                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                            {fields.map((field, index) => (
                                <Card
                                    size="small"
                                    title={`Item ${index + 1}`}
                                    key={field.key}
                                    extra={<CloseOutlined onClick={() => remove(field.name)} />}
                                >
                                    <Form.Item label="Name" name={[field.name, 'name']}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="List" name={[field.name, "values"]}>
                                        <Form.List name={[field.name, 'list']}>
                                            {(subFields, subOpt) => (
                                                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                                    {subFields.map((subField) => (
                                                        <Space key={subField.key}>
                                                            <Form.Item noStyle name={[subField.name, 'value']}>
                                                                <Input placeholder="value" />
                                                            </Form.Item>
                                                            <CloseOutlined onClick={() => subOpt.remove(subField.name)} />
                                                        </Space>
                                                    ))}
                                                    <Button type="dashed" onClick={() => subOpt.add()} block>+ Add Sub Item</Button>
                                                </div>
                                            )}
                                        </Form.List>
                                    </Form.Item>
                                </Card>
                            ))}
                            <Button type="dashed" onClick={() => add()} block>+ Add Item</Button>
                            <div>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </div>
                        </div>
                    )}
                </Form.List>
            </Form>
        </div>
    );
};