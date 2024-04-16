import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Input,
    Upload,
    UploadFile,
    UploadProps,
    message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { mutateCreateBanner } from "../service/Mutation/mutateCreateBanner"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

type CategoryData = {
    title: string;
    description: string;
    img: {
        file: File;
        fileList: UploadFile;
    };
};
export interface FormTypes {
    data: {
        id: number;
        img: string;
        parent: null;
        title: string;
        description: string;
    };
}
export const CreateBanner: React.FC = () => {
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const { mutate } = mutateCreateBanner();
    const onFinish = (values: CategoryData) => {
        console.log(values);
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("parent", "");
        if (values.img) {
            formData.append("image", values.img.file);
        }
        mutate(formData, {
            onSuccess: () => {
                message.success("success");
                navigate("/home")
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };
    return (
        <div style={{ position: "relative", height: "650px", paddingLeft: "150px", paddingTop: "80px" }}>
            <Button onClick={() => navigate("/home/banner")} style={{ position: "absolute", left: "20px", top: "20px" }}>Back</Button>
            <Form
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="vertical"
                style={{ maxWidth: 600 }}
            >
                <Form.Item style={{}} label="CategoryName" name="title">
                    <Input size="large" />
                </Form.Item>
                <Form.Item label="Upload" name="img">
                    <Upload.Dragger
                        name="img"
                        beforeUpload={() => false}
                        listType="picture-card"
                        onChange={handleChange}
                        fileList={fileList}
                        multiple={false}
                        maxCount={1}
                    >
                        <button style={{ border: 0, background: "none" }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item name="description">
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" style={{ marginTop: "20px" }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

