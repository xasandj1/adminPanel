import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Input,
    Select,
    Upload,
    UploadFile,
    UploadProps,
    message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { getUseSub } from "./service/Query/getUseSub";
import { useMutateSub } from "./service/Mutation/getCreatSub";

type CategoryData = {
    title: string;
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
    };
}
export const CreateSub: React.FC = () => {

    const navigate = useNavigate();
    const [seletCategory, setSeletCategory] = useState<any>(null)
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const ChangeCategory = (value: number) => {
        setSeletCategory(value)
    }

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const { mutate } = useMutateSub();
    const { data } = getUseSub()

    const onFinish = (values: CategoryData) => {
        console.log(values);
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("parent", seletCategory!.toString());
        if (values.img) {
            formData.append("image", values.img.file);
        }
        mutate(formData, {
            onSuccess: () => {
                message.success("success");
                navigate("/home/subcategory")
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };
    return (
        <div style={{ position: "relative", height: "650px", paddingLeft: "150px", paddingTop: "80px" }}>
            <Button onClick={() => navigate("/home/subcategory")} style={{ position: "absolute", left: "20px", top: "20px" }}>Back</Button>
            <Form
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="vertical"
                style={{ maxWidth: 600 }}
            >
                <Form.Item>
                    <Select onChange={ChangeCategory}
                        options={data?.results?.map((item) => ({
                            value: item.id,
                            label: item.title
                        }))} />
                </Form.Item>
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
                <Form.Item>
                    <Button htmlType="submit" type="primary">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

