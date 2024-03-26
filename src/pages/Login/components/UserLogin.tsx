import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input } from 'antd';
import { useMutationUser } from '../service/useMutationUser';

type FieldType = {
    useremail?: string;
    password?: string;
    remember?: string;
};



const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};



export const UserLogin: React.FC = () => {
    const { mutate } = useMutationUser()
    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        mutate(values, {
            onSuccess: (res) => {
                console.log(res);
                Cookies.set('token', res?.token, { expires: 7 })
            },
            onError: (err) => {
                console.log(err)
            }
        })
    }; 
    return (
        <section className="user__section" >
            <div className="container user__container">
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
                        label="User Email"
                        name="useremail"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder='useremail@gmail.com' />
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
