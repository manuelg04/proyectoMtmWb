import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import styles from '../../../styles/Login.module.css'


const Login = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col xs={20} sm={16} md={12} lg={8}>
      <div className={styles.header}>
      <img src="/images/logomtm.jpg" alt="logo" className={styles.logo} />
          <h2>Bienvenido, ingrese sus datos para iniciar sesión</h2>
        </div>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
    </Col>
    </Row>
    </>
  );
};

export default Login;