import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    Switch,
    Upload,
    UploadFile,
    UploadProps,
    message,
} from "antd";
import { useNavigate } from "react-router-dom";
import "../sass/products.scss"
import { getSubCategoryProduct } from "../../SubCategoryList/service/Query/getSubCategory";
// import { usePostProduct } from "./service/mutation/usePostCategory";

type CategoryData = {
    title: string;
    price: number;
    is_new: boolean | undefined;
    is_available: boolean | undefined
    img: {
        file: File;
        fileList: UploadFile;
    };
    category: number
};
export interface FormTypes {
    data: {
        id: number;
        img: string;
        parent: null;
        title: string;
    };
}
export const ProductsCreate: React.FC = () => {
    const navigate = useNavigate();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [selectCategory, setSeletCategory] = useState<number | null>(null)

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);


    // const { mutate } = usePostProduct();
    const onFinish = (values: CategoryData) => {
        console.log(values);
        const formData = new FormData();
        formData.append("title", values.title);
        if (values.is_new == undefined) {
            formData.append("is_new", String(false));
        } else {
            formData.append("is_new", String(values.is_new));
        }
        if (values.is_available == undefined) {
            formData.append("is_available", String(false));
        } else {
            formData.append("is_available", String(values.is_available));
        }
        formData.append("price", String(values.price));
        formData.append("category", String(values.category));

        formData.append("parent", selectCategory!.toString());
        if (values.img) {
            formData.append("image", values.img.file);
        }
        // mutate(formData, {
        //     onSuccess: () => {
        //         message.success("success");
        //         navigate("/home/product")
        //     },
        //     onError: (error) => {
        //         console.log(error);
        //     },
        // });
    };



    const { data } = getSubCategoryProduct  ()


    const ChangeCategory = (value: number) => {
        setSeletCategory(value)
    }



    return (
        <div style={{ position: "relative", height: "650px", paddingLeft: "150px", paddingTop: "80px" }}>
            <Button onClick={() => navigate("/home/product")} style={{ position: "absolute", left: "20px", top: "20px" }}>Back</Button>
            <Form
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="vertical"
                style={{ maxWidth: 600 }}
            >
                <Form.Item label="Category" name={"category"}>
                    <Select
                        onChange={ChangeCategory}
                        style={{ width: "100%" }}
                        options={data?.map((item: any) => ({
                            value: item.id,
                            label: item.title
                        }))}
                    />
                </Form.Item>

                <Space>
                    <Form.Item name={"is_new"} label="Is New">
                        <Switch />
                    </Form.Item>
                    <Form.Item name={"is_available"} label="Is Available">
                        <Switch />
                    </Form.Item>
                </Space>

                <Form.Item style={{}} label="ProductName" name="title">
                    <Input size="large" />
                </Form.Item>

                <Form.Item name="price">
                    <InputNumber<number>

                        style={{ width: "350px" }}
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}

                    />
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

