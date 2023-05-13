import axios from 'axios';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { API_CONTROLLER_EMAIL_URL, API_CONTROLLER_VEHICULOSCONTROLLER_URL } from '../../constantes';

function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    axios
      .get(API_CONTROLLER_VEHICULOSCONTROLLER_URL)
      .then((response) => {
        setVehiculos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
      });
  }, [reloadData]);

  const sendEmail = async () => {
    const testData = {
      email: 'manuelg9704@gmail.com',
      nombre: 'Test User',
      token: '123456789',
    };
    try {
      await axios.post(API_CONTROLLER_EMAIL_URL, testData);
      console.log('Correo de prueba enviado con éxito');
    } catch (error) {
      console.log('Error al enviar el correo de prueba:', error.message);
    }
  };

  const columns = [
    {
      title: 'Placa',
      dataIndex: 'placa',
      key: 'placa',
    },

    {
      title: 'Linea',
      dataIndex: 'linea',
      key: 'linea',
    },
    {
      title: 'Modelo',
      dataIndex: 'modelo',
      key: 'modelo',
    },

  ];

  return (

    <div>
      <button type="button" onClick={sendEmail}>Enviar correo de prueba</button>
      <h1>Vehiculos</h1>
      <Table dataSource={vehiculos} columns={columns} />
    </div>
  );
}

export default Vehiculos;
