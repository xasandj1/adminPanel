import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Input,
    Select,
    TabsProps,
    Upload,
    UploadFile,
    UploadProps,
    message,
    Tabs
} from "antd";
import { useNavigate } from "react-router-dom";
import { AttributeCreate } from "../Atributes/components/AttributeCreate";
import { usePostCategory } from "./service/Mutation/getCreatSub";
import { useGetCategoryTitle } from "./service/Query/getUseSub";

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
export const CreateSubCategory: React.FC = () => {
    const navigate = useNavigate();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [selectCategory, setSeletCategory] = useState<number | null>(null)
    const [idd, setId] = useState(undefined)
    const [keyy, setKeyy] = useState(1)

    const ChangeCategory = (value: number) => {
        setSeletCategory(value)
    }
    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);


    const { mutate } = usePostCategory();
    const onFinish = (values: CategoryData) => {
        console.log(values);
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("parent", selectCategory!.toString());
        if (values.img) {
            formData.append("image", values.img.file);
        }
        mutate(formData, {
            onSuccess: (data) => {
                message.success("success");
                setId(data?.data?.id)
                setKeyy(2)
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    const { data } = useGetCategoryTitle()


    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Sub Category",
            children: <div style={{ position: "relative", height: "650px", paddingLeft: "150px", paddingTop: "80px" }}>
                <Button onClick={() => navigate("/home/subcategory")} style={{ position: "absolute", left: "20px", top: "20px" }}>Back</Button>
                <Form
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="vertical"
                    style={{ maxWidth: 600 }}
                >

                    <Form.Item>
                        <Select
                            onChange={ChangeCategory}
                            style={{ width: "100%" }}
                            options={data?.map((item) => ({
                                value: item.id,
                                label: item.title
                            }))}
                        />
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
        },
        {
            key: "2",
            label: "Attribute",
            children: <AttributeCreate subCategoryId={Number(idd)} />
        }
    ]
    return (
        <Tabs

            items={items} activeKey={String(keyy)} />
    );
};

