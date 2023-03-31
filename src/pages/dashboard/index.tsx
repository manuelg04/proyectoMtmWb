/* eslint-disable arrow-body-style */
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
  Layout, Menu, Table, Button, Modal, Form, Input, DatePicker, Space, Dropdown, AntMenu, message, Select,
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
import dayjs from 'dayjs';
import styles from '../../../styles/Dashboard.module.css';
import { Usuario } from '../../../tipos';
import { API_CONTROLLER_NEWUSER, API_CONTROLLER_LOGOUT, API_CONTROLLER_USERCONTROLLER } from '../../../constantes';

const {
  Header, Content, Footer, Sider,
} = Layout;

const Dashboard: NextComponentType = () => {
  const router = useRouter();
  let form:any;
  const [searchValue, setSearchValue] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedCargo, setSelectedCargo] = useState(null);
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

  const handleRoleSelection = (value: string) => {
    let roleid;
    let cargo;
    switch (value) {
      case 'Conductor':
        roleid = 5;
        cargo = 'Conductor';
        break;
      case 'Agente':
        roleid = 3;
        cargo = 'Agente';
        break;
      case 'Seguridad':
        roleid = 2;
        cargo = 'Seguridad';
        break;
      default:
        roleid = null;
        cargo = null;
    }
    setSelectedRole(roleid);
    setSelectedCargo(cargo);
  };
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

  const filteredData = usersTable.filter((user: Usuario) => {
    const searchTerm = searchValue.toLowerCase();
    return (
      user.nombres.toLowerCase().includes(searchTerm)
      || user.documento.toLowerCase().includes(searchTerm)
    );
  });

  const dataSource = usersTable
    .map((user:Usuario, index) => ({
      key: index,
      nombre: user.nombres,
      documento: user.documento,
      fechad_creacion: user.fechad_creacion,
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
    {
      title: 'Fecha de creacion',
      dataIndex: 'fechad_creacion',
      key: 'fechad_creacion',
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
      fechad_creacion: values.fechad_creacion,
      idusuario: values.idusuario,
      nombres: values.nombres,
      documento: values.documento,
      celular: values.celular,
      correo: values.correo,
      sucursal: values.sucursal,
      rolid: values.rolid,
      cargo: values.cargo,
    };

    try {
      await axios.post(API_CONTROLLER_NEWUSER, user);
      message.success('Usuario creado exitosamente');
      setModalVisible(false);
    } catch (error) {
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
            <Input.Search
              placeholder="Buscar..."
              style={{ marginLeft: 16, marginBottom: 16 }}
              onChange={(e) => setSearchValue(e.target.value)}
            />
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
                <Form.Item
                  label="Fecha de creación"
                  name="fechad_creacion"
                  initialValue={dayjs().format('DD/MM/YYYY')}
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  label="ID del rol"
                  name="cargo"
                  initialValue={selectedRole}
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Seleccione el tipo de usuario" name="cargo">
                  <Select
                    placeholder="Seleccionar tipo de usuario"
                    onChange={(value) => handleRoleSelection(value)}
                  >
                    <Select.Option value="Conductor">Conductor</Select.Option>
                    <Select.Option value="Agente">Agente</Select.Option>
                    <Select.Option value="Seguridad">Seguridad</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Nombre completo" name="nombres">
                  <Input />
                </Form.Item>
                <Form.Item label="Número de documento" name="documento">
                  <Input />
                </Form.Item>
                <Form.Item label="Celular" name="celular">
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
            <Table
              dataSource={filteredData.map((user: Usuario, index) => ({
                key: index,
                nombre: user.nombres,
                documento: user.documento,
                fechad_creacion: user.fechad_creacion,
              }))}
              columns={columns}
            />
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
