import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Image,
    Input,
    Upload,
    UploadFile,
    UploadProps,
    message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { mutateSubEdit } from "./service/mutation/mutateSubEdit";
import { getSubId } from "./service/query/getSub";




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
export const EditSub: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const { mutate } = mutateSubEdit(id as string);
    const { data: productData } = getSubId(id as string)

    const onFinish = (values: CategoryData) => {

        console.log(values);
        const formData = new FormData();
        formData.append("title", values.title);
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
    }

    return (
        <div style={{ position: "relative", height: "650px", paddingLeft: "150px", paddingTop: "80px" }}>
            <Button onClick={() => navigate("/home/subcategory")} style={{ position: "absolute", left: "20px", top: "20px" }}>Back</Button>
            {
                productData && (
                    <Form
                        initialValues={productData}
                        onFinish={onFinish}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="vertical"
                        style={{ maxWidth: 600 }}

                    >
                        <Form.Item>
                            {/* <Select
                                defaultValue={Titlee.parent.title}
                                style={{ width: "100%" }}
                                options={data?.map((item) => ({
                                    value: item.id,
                                    label: item.title
                                }))}
                            /> */}
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
                        {
                            !fileList.length && <Image width={200} src={productData.image} alt={'hgug'} />
                        }
                        <br />
                        <br />
                        <Form.Item>
                            <Button htmlType="submit" type="primary">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                )
            }
        </div>
    );
};

