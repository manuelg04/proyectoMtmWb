import React, { useState, useEffect } from 'react';
import {
  Form, Input, Button, Typography,
} from 'antd';
import styles from '../../styles/Profile.module.css';

const { Title } = Typography;

const Profile = () => {
  // Simula los datos del perfil del usuario
  const [userProfile, setUserProfile] = useState({ name: '', document: '' });

  // Simula la obtención de datos del perfil
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUserProfile = {
        name: 'John Doe',
        document: '1234567890',
      };
      setUserProfile(fetchedUserProfile);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Title level={2}>Bienvenido a tu perfil</Title>
        <Title level={4}>¿Deseas hacer algún cambio?</Title>
      </div>
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
  );
};

export default Profile;
