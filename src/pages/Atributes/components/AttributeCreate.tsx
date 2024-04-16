import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { usePostAtt } from '../service/Mutate/useSendAtt';

export interface FormTypes {
    data: {
        id: number;
        img: string;
        parent: null;
        title: string;
    };
}

export interface CategoryData {
    title?: string | null,
    category?: number[],
    value?: string[]
};


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

interface AttributeCreateProps {
    subCategoryId?: number;
}

export const AttributeCreate: React.FC<AttributeCreateProps> = ({ subCategoryId }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { mutate } = usePostAtt();
    const onFinish = (values: { items: Item[] }) => {
        const payload: Payload = {
            attr_list: values.items.map((item: Item) => ({
                title: item.name,
                category: [subCategoryId],
                values: item.list?.map((subItem: SubItem) => subItem.value) || []
            })) as CategoryData[]
        };

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
        <div>
            <Link to={"/home/subcategory"}>
                <Button
                    style={{ marginBottom: "20px" }}
                >Back</Button>
            </Link>
            <Form
                onFinish={onFinish}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                form={form}
                name="dynamic_form_complex"
                style={{ maxWidth: 700 }}
                autoComplete="off"
                initialValues={{ items: [{}] }}
            >
                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                            {fields.map((field) => (
                                <Card
                                    size="default"
                                    title={`Attribute ${field.name + 1}`}
                                    key={field.key}
                                    extra={
                                        <CloseOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    }
                                >
                                    <Form.Item label="Attribute Name" name={[field.name, 'name']}>
                                        <Input size='large' name='title' />
                                    </Form.Item>

                                    <Form.Item label="Value" name={[field.name, "values"]}>
                                        <Form.List name={[field.name, 'list']}>
                                            {(subFields, subOpt) => (
                                                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                                    {subFields.map((subField) => (
                                                        <Space key={subField.key}>
                                                            <Form.Item noStyle name={[subField.name, 'first']}>
                                                                <Input size='large' placeholder={`value ${subField.name + 1}`} />
                                                            </Form.Item>
                                                            <CloseOutlined
                                                                onClick={() => {
                                                                    subOpt.remove(subField.name);
                                                                }}
                                                            />
                                                        </Space>
                                                    ))}
                                                    <Button size='large' type="dashed" onClick={() => subOpt.add()} block>
                                                        + Add Value
                                                    </Button>
                                                </div>
                                            )}
                                        </Form.List>
                                    </Form.Item>
                                </Card>
                            ))}

                            <Button size='large' type="dashed" onClick={() => add()} block>
                                + Add Attribute
                            </Button>
                        </div>
                    )}
                </Form.List>
                <Button
                    htmlType="submit"
                    style={{ marginTop: "20px" }}
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}
