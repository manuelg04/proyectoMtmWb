/* eslint-disable import/prefer-default-export */
import db from '../../../db';

export const getAllVehiculos = async () => {
  try {
    const [rows] = await db.query('SELECT placa, modelo, linea FROM vehiculo');
    return rows;
  } catch (error) {
    console.log('Error al obtener vehículos: ', error);
    throw error;
  }
};
