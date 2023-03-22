/* eslint-disable no-eval */
import {
  Form, Input, Button, Col, Row,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Router, useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '../../../styles/Login.module.css';
import { queryDatabase } from '../../../db';
import { API_URL } from '../../../constantes';

const Login = () => {
  const router = useRouter();
  const [dataUsuarios, setDataUsuarios] = useState([]);

  const fetchData = async () => {
    const resultUsuarios = await axios.get(API_URL);
    console.log(resultUsuarios.data.dataUsuarios);
    setDataUsuarios(resultUsuarios.data.dataUsuarios);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);

    // Verificar si dataUsuarios es un array
    if (Array.isArray(dataUsuarios)) {
      // Buscar el usuario en el array de dataUsuarios
      const user = dataUsuarios.find(
        (usuario) => usuario.documento === values.documento && values.password === '123',
      );

      // Verificar si se encontró el usuario
      if (user) {
        // Iniciar sesión y redirigir al usuario a la página deseada
        console.log('Inicio de sesión exitoso!');
        router.push('/dashboard/dashboard');
      } else {
        // Mostrar mensaje de error si el inicio de sesión falla
        console.log('Error en el inicio de sesión. Documento o contraseña incorrectos.');
      }
    } else {
      console.log('Error: dataUsuarios no es un array.');
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
            rules={[{ required: true, message: 'Please input your document!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Documento" />
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
  );
};

export default Login;
