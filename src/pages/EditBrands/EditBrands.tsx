import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Image,
    Input,
    Upload,
    message,
} from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBrand } from "./service/Query/useGetBrands";
import { useMutateBrandsId } from "./service/Mutate/useMutateBrands";

type CategoryData = {
    title: string;
    img: {
        file: File;
    };
};

export const EditBrands = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data } = useGetBrand(id as string);
    const { mutate } = useMutateBrandsId(id as string);

    const [fileList, setFileList] = useState<File[]>([]);

    const onFinish = (values: CategoryData) => {
        const formData = new FormData();
        formData.append("title", values.title);
        if (values.img) {
            formData.append("image", values.img.file);
        }

        mutate(formData, {
            onSuccess: () => {
                message.success("Success");
                navigate("/home/brands");
            },
            onError: (error) => {
                console.error(error);
            },
        });
    };

    const handleFileChange = (file: File) => {
        setFileList([file]);
    };

    return (
        <div style={{ position: "relative", height: "650px", paddingLeft: "150px", paddingTop: "80px" }}>
            <Button onClick={() => navigate("/home/brands")} style={{ position: "absolute", left: "20px", top: "20px" }}>Back</Button>

            {data && <Form
                initialValues={data}
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="vertical"
                style={{ maxWidth: 600 }}
            >
                <Form.Item label="CategoryName" name="title">
                    <Input size="large" />
                </Form.Item>

                <Form.Item label="Upload" name="img">
                    <Upload
                        listType="picture"
                        maxCount={1}
                        beforeUpload={() => false}
                        onChange={(info) => {
                            const file = info.fileList[0]?.originFileObj;
                            if (file) {
                                handleFileChange(file);
                            }
                        }}
                    >
                        <Button icon={<PlusOutlined />} style={{ marginBottom: '8px' }}>Upload</Button>
                    </Upload>
                    {fileList.length > 0 && <Image width={200} src={URL.createObjectURL(fileList[0])} />}
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" type="primary">Submit</Button>
                </Form.Item>
            </Form>}
        </div>
    );
};