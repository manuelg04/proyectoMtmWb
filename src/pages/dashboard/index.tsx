/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
// components/Dashboard/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Layout, Menu, Table, Button, Modal, Form, Input, Select, Space, Dropdown, AntMenu, message,
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
import cookie from 'cookie';
import { NextComponentType } from 'next';
import styles from '../../../styles/Dashboard.module.css';
import { Usuario } from '../../../tipos';
import { API_CONTROLLER_NEWUSER, API_CONTROLLER_LOGOUT, API_CONTROLLER_USERCONTROLLER } from '../../../constantes';

const {
  Header, Content, Footer, Sider,
} = Layout;

const Dashboard: NextComponentType = () => {
  const router = useRouter();
  let form:any;
  const [modalVisible, setModalVisible] = useState(false);
  const [usersTable, setUsersTable] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [user, setUser] = useState({
    email: '',
    username: '',
  });
  useEffect(() => {
    axios
      .get(API_CONTROLLER_USERCONTROLLER)
      .then((response) => {
        // console.log('Usuarios:', response.data); // Imprimir en consola del navegador
        setUsersTable(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []);

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

  const dataSource = usersTable.map((user:Usuario, index) => ({ // Utilizar el estado users en lugar del array estático
    key: index,
    nombre: user.nombres,
    documento: user.documento,
  }));

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Documento',
      dataIndex: 'documento',
      key: 'documento',
    },
  ];

  const getLoggedInUser = async () => {
    try {
      const cookies = cookie.parse(document.cookie); // Parsea las cookies del documento
      const documento = cookies.userDocumento; // Obtén el documento del usuario de la cookie
      if (documento) {
        const response = await axios.get(`/api/controllers/userName?documento=${documento}`);
        setLoggedInUser(response.data.nombres); // Actualizar el estado loggedInUser con el nombre del usuario
        console.log(' nombre del usuario', response.data);
      }
    } catch (error) {
      console.log('Error al obtener el nombre del usuario:', error);
    }
  };
  useEffect(() => {
    getLoggedInUser();
  }, []);

  const newUser = async (values: Usuario) => {
    const user = {
      idusuario: values.idusuario,
      nombres: values.nombres,
      documento: values.documento,
      cargo: values.cargo,
      correo: values.correo,
      sucursal: values.sucursal,
      rolid: 3,
    };

    try {
      await axios.post(API_CONTROLLER_NEWUSER, user);
      message.success('Usuario creado exitosamente');
    } catch (error) {
      console.log('Error al crear el usuario:', error);
      message.error('Error al crear el usuario');
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
      const response = await axios.post(API_CONTROLLER_LOGOUT);
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
          Bienvenido,
          {' '}
          {loggedInUser}
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
