/* eslint-disable no-eval */
import {
  Form, Input, Button, Col, Row,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import styles from '../../../styles/Login.module.css';

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Añade un estado para manejar la carga

  const onFinish = async (values: any) => {
    setLoading(true); // Cambia el estado de carga a verdadero
    try {
      const response = await axios.post('/api/auth/login', values);
      console.log(response);

      if (response.status === 200) {
        router.push('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        message.error('Credenciales inválidas. Por favor, inténtalo de nuevo.');
      } else {
        message.error('Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }} className={styles.loginBackground}>
      <Col xs={20} sm={16} md={12} lg={8}>
        <div className={styles.header}>
          <img src="/images/logomtm.jpg" alt="logo" className={`${styles.logo} ${styles.logoRounded}`} />
          <h2>Bienvenido, ingrese sus datos para iniciar sesión</h2>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="documento"
            rules={[{ required: true, message: 'Por favor ingresa tu documento!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Documento" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor ingresa tu clave!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
              Iniciar Sesion
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
