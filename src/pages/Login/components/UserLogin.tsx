import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input } from 'antd';
import { useMutationUser } from '../service/useMutationUser';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type FieldType = {
    phone_number?: string;
    password?: string;
    remember?: string;
};

export const UserLogin: React.FC = () => {
    const { mutate } = useMutationUser()
    const navigate = useNavigate()
    const onFinish: FormProps<FieldType>["onFinish"] = (values: any) => {

        mutate(values, {
            onSuccess: (res) => {
                console.log(res);
                Cookies.set('token', res?.token, { expires: 7 });
                navigate("/home")
            },
            onError: (err) => {
                console.log(err)
            }
        })
    };
    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <section className="user__section" >
            <div className="user__container">
                <Form

                    className='user__content'
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="User Number"
                        name="phone_number"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder='+99 ( ) ***-**-**' />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder='your password' />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    )
}
