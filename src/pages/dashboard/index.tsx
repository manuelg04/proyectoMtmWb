/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
// components/Dashboard/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Layout, Menu, Table, Button, Modal, Form, Input, Select, Space, Dropdown, AntMenu,
} from 'antd';
import {
  UserOutlined,
  CarOutlined,
  TeamOutlined,
  HomeOutlined,
  ForkOutlined,
  ContainerOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import styles from '../../../styles/Dashboard.module.css';
import { createUser, getAllUsers } from '../api/models/db';

const {
  Header, Content, Footer, Sider,
} = Layout;

const Dashboard: React.FC = () => {
  const router = useRouter();
  let form:any;
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({
    email: '',
    username: '',
  });

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const [selectedKey, setSelectedKey] = useState('1');

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };

  const dataSource = [
    {
      key: '1',
      name: 'Usuario 1',
      role: 'Administrador',
    },
    {
      key: '2',
      name: 'Usuario 2',
      role: 'Operador',
    },
  ];

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  const newUser = async (values: any) => {
    const usuario = {
      nombres: values.nombres,
      documento: values.documento,
      correo: values.correo,
      cargo: values.cargo,
      sucursal: values.sucursal,
    };
    console.log(usuario);
    try {
      await createUser(usuario);
      console.log('Usuario insertado correctamente');
      setModalVisible(false);
    } catch (error) {
      console.error('Error al insertar el usuario:', error);
    }
  };

  const content = (() => {
    switch (selectedKey) {
      case '1':
        return (
          <>
            <Button type="primary" style={{ marginBottom: 16 }} onClick={showModal}>
              Crear nuevos usuarios
            </Button>
            <Modal
              title="Crear nuevos usuarios"
              open={modalVisible}
              onCancel={handleCancel}
              okText="Crear"
              cancelText="Cancelar"
              onOk={() => {
                form.submit(); // Agregar esta línea para enviar el formulario
              }}
            >
              <Form
                layout="vertical"
                onFinish={(values) => newUser(values)}
                ref={(el) => {
                  form = el; // Asignar la referencia del formulario al objeto form
                }}
              >
                <Form.Item label="Nombre completo" name="nombres">
                  <Input />
                </Form.Item>
                <Form.Item label="Número de documento" name="documento">
                  <Input />
                </Form.Item>
                <Form.Item label="Cargo" name="cargo">
                  <Input />
                </Form.Item>
                <Form.Item label="Email corporativo" name="correo">
                  <Input />
                </Form.Item>
                <Form.Item label="Sucursal/Zona a la que pertenece" name="sucursal">
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
            <Table dataSource={dataSource} columns={columns} />
          </>
        );
      default:
        return <div>Contenido del Dashboard</div>;
    }
  })();

  const getProfile = async () => {
    const profile = await axios.get('/api/profile');
    setUser(profile.data);
  };

  const logout = async () => {
    try {
      const response = await axios.post('/api/auth/logout');
      router.push('/auth/login');
      console.log(response);
    } catch (error) {
      console.log(error);
      router.push('/auth/login');
    }
  };
  return (
    <>
      <div>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
        <Space wrap style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <button onClick={() => getProfile()}>profile</button>
          <Button type="primary" onClick={() => logout()} style={{ alignSelf: 'flex-start' }}>Logout</Button>
        </Space>
      </div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider className={styles.sider}>
          <div className={styles.logo} />
          <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline" onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Usuarios Internos
            </Menu.Item>
            <Menu.Item key="2" icon={<CarOutlined />}>
              Conductores
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />}>
              Vehículos
            </Menu.Item>
            <Menu.Item key="4" icon={<HomeOutlined />}>
              Propietarios
            </Menu.Item>
            <Menu.Item key="5" icon={<ForkOutlined />}>
              Tenedores
            </Menu.Item>
            <Menu.Item key="6" icon={<ContainerOutlined />}>
              Remolques
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={`${styles['site-layout']} ${styles['site-layout-background']}`}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {content}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Transportes mtm S.A.S. ©
            {new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>

    </>
  );
};

export default Dashboard;
