/* eslint-disable max-len */
/* eslint-disable spaced-comment */
import React, { useState, useEffect } from 'react';
import {
  Form, Input, Button, Typography,
} from 'antd';
import axios from 'axios';
import { API_CONTROLLER_GETUSERBYDOC_URL } from '@/constantesproyectomtm';
import styles from '../../styles/Profile.module.css';
import { getUserNameByDocument } from './api/models/userByDoc';
import { useUserContext } from '../contexts/UserContext';

const { Title } = Typography;

const Profile = () => {
  // Simula los datos del perfil del usuario
  const [userProfile, setUserProfile] = useState({ name: '', document: '' });
  const { userDocument } = useUserContext();

  //const getLoggedInUserDocument = () => '5465464'; // Reemplaza con la implementación real en tu aplicación

  // Función para obtener los datos del perfil del usuario logueado
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_CONTROLLER_GETUSERBYDOC_URL}documento=${userDocument}`);
      const userName = response.data.nombres;
      console.log(userName);
      if (userName) {
        setUserProfile({ name: userName, document: userDocument });
      }
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Title level={2}>Bienvenido a tu perfil</Title>
        <Title level={4}>¿Deseas hacer algún cambio?</Title>
      </div>
      <div className={styles.formContainer}>
        <Form layout="vertical">
          <Form.Item label="Nombre">
            <Input value={userProfile.name} readOnly />
          </Form.Item>
          <Form.Item label="Documento">
            <Input value={userProfile.document} readOnly />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Editar perfil</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
