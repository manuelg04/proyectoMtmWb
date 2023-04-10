/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
// components/Dashboard/Dashboard.tsx
import React, { useEffect, useMemo, useState } from 'react';
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
import { Usuario } from '../../tipos';
import {
  API_CONTROLLER_NEWUSER_URL,
  API_CONTROLLER_LOGOUT_URL,
  API_CONTROLLER_USERCONTROLLER_URL,
  API_CONTROLLER_UPDATEUSER_URL,
} from '../../constantes';

const {
  Header, Content, Footer, Sider,
} = Layout;

const Dashboard: NextComponentType = () => {
  const router = useRouter();
  let form:any;
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [usersTable, setUsersTable] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [user, setUser] = useState({
    email: '',
    username: '',
  });
  const [form2] = Form.useForm();
  useEffect(() => {
    axios
      .get(API_CONTROLLER_USERCONTROLLER_URL)
      .then((response) => {
        setUsersTable(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []);

  const handleEdit = (user:any) => {
    console.log(user);
    setSelectedUser(user);
    setEditModalVisible(true);
  };
  const clearForm = () => {
    form2.resetFields();
  };

  useEffect(() => {
    if (selectedUser) {
      form2.setFieldsValue({
        nombres: selectedUser.nombre,
        documento: selectedUser.documento,
        celular: selectedUser.celular,
        correo: selectedUser.correo,
        sucursal: selectedUser.sucursal,
        cargo: selectedUser.cargo,
        fechad_creacion: dayjs(selectedUser.fechad_creacion).format('DD/MM/YYYY'),
      });
    }
  }, [selectedUser, form2]);

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
    clearForm();
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditModalVisible(false);
  };

  const [selectedKey, setSelectedKey] = useState('1');

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };

  const handleSearch = (e: any) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);
  };
  const filteredData = useMemo(() => {
    return usersTable.filter((user: Usuario) => {
      return (
        (user.nombres && user.nombres.toLowerCase().includes(searchText))
        || (user.documento && user.documento.toLowerCase().includes(searchText))
        || (user.celular && user.celular.toLowerCase().includes(searchText))
        || (user.correo && user.correo.toLowerCase().includes(searchText))
        || (user.sucursal && user.sucursal.toLowerCase().includes(searchText))
      );
    });
  }, [usersTable, searchText]);

  const dataSource = usersTable
    .map((user:Usuario, index) => ({
      key: index,
      nombre: user.nombres,
      documento: user.documento,
      fechad_creacion: user.fechad_creacion,
      celular: user.celular,
      sucursal: user.sucursal,
      correo: user.correo,
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
    {
      title: 'Celular',
      dataIndex: 'celular',
      key: 'celular',
    },
    {
      title: 'Sucursal',
      dataIndex: 'sucursal',
      key: 'sucursal',
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo',
    },
    {
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      render: (_text: any, record: Usuario) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>Editar</Button>
          <Button type="danger" onClick={() => handleDelete(record)}>Borrar</Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (record: any) => {
    console.log('Borrar usuario:', record);
    // Implementa la lógica para borrar el usuario aquí
  };

  const getLoggedInUser = async () => {
    try {
      const cookies = cookie.parse(document.cookie); // Parsea las cookies del documento
      const documento = cookies.userDocumento; // Obtén el documento del usuario de la cookie
      if (documento) {
        const response = await axios.get(`/api/controllers/userName?documento=${documento}`);// REVISA ESTA LINEA
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
      await axios.post(API_CONTROLLER_NEWUSER_URL, user);
      message.success('Usuario creado exitosamente');
      setModalVisible(false);
      setUsersTable((prevUsers) => {
        const updatedUsers = [...prevUsers];
        updatedUsers.push(user);
        return updatedUsers;
      });
    } catch (error) {
      message.error('Error al crear el usuario');
    }
  };

  const updateUser = async (user: Usuario) => {
    try {
      await axios.put(API_CONTROLLER_UPDATEUSER_URL, user);
      message.success('Usuario actualizado exitosamente');
      setEditModalVisible(false);
      setUsersTable((prevUsers) => prevUsers.map((prevUser) => (prevUser.documento === user.documento ? user : prevUser))); // Agrega esta línea
      // Aquí, vuelve a cargar los datos de la tabla o actualiza el estado local según cómo estés manejando los datos
    } catch (error) {
      console.log(error);
      message.error('Error al actualizar el usuario');
    }
  };

  const handleUserSubmit = async (values: Usuario) => {
    if (selectedUser) {
      updateUser({ ...selectedUser, ...values });
    } else {
      newUser(values);
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
              onChange={handleSearch}
            />
            <Modal
              title={selectedUser ? 'Editar usuario' : 'Crear nuevos usuarios'}
              open={modalVisible || editModalVisible}
              onCancel={() => {
                handleCancel();
                setSelectedUser(null);
              }}
              okText={selectedUser ? 'Actualizar' : 'Crear'}
              cancelText="Cancelar"
              onOk={() => {
                form.submit(); // Agregar esta línea para enviar el formulario
              }}
            >
              <Form
                layout="vertical"
                onFinish={(values) => handleUserSubmit(values)}
                form={form2}
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
                <Form.Item
                  label="Seleccione el tipo de usuario"
                  name="cargo"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, seleccione el tipo de usuario',
                    },
                  ]}
                >
                  <Select
                    placeholder="Seleccionar tipo de usuario"
                    onChange={(value) => handleRoleSelection(value)}
                  >
                    <Select.Option value="Conductor">Conductor</Select.Option>
                    <Select.Option value="Agente">Agente</Select.Option>
                    <Select.Option value="Seguridad">Seguridad</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Nombre completo"
                  name="nombres"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, ingrese el nombre completo',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Número de documento"
                  name="documento"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, ingrese el número de documento',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Celular"
                  name="celular"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, ingrese el número de celular',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email corporativo"
                  name="correo"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, ingrese el email corporativo',
                    },
                    {
                      type: 'email',
                      message: 'Por favor, ingrese un correo electrónico válido',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Sucursal/Zona a la que pertenece"
                  name="sucursal"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, ingrese la sucursal o zona a la que pertenece',
                    },
                  ]}
                >
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
                celular: user.celular,
                correo: user.correo,
                sucursal: user.sucursal,
              }))}
              columns={columns}
              style={{ width: '100%' }}
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
      const response = await axios.post(API_CONTROLLER_LOGOUT_URL);
      router.push('/auth/login');
      console.log(response);
    } catch (error) {
      console.log(error);
      router.push('/auth/login');
    }
  };
  return (
    <>
      <div className={styles.welcomeContainer}>
        <h2 className={styles.welcomeMessage}>
          Bienvenido,
          {' '}
          <span className={styles.username}>{loggedInUser}</span>
        </h2>
        <Space
          wrap
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '16px',
          }}
        >

          <button onClick={() => getProfile()}>profile</button>
          <Button
            type="primary"
            onClick={() => logout()}
            style={{ alignSelf: 'flex-start' }}
          >
            Logout
          </Button>
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
          <Header className="site-layout-background" style={{ padding: 0, marginLeft: '-180px' }} />
          <Content style={{ margin: '0', minHeight: '100vh' }} className={styles.content}>
            <div className={styles['site-layout-background']}
              style={{
                padding: 24, minHeight: 360, width: '100%', marginLeft: '-180px',
              }}
            >
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
