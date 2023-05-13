import { NextApiRequest, NextApiResponse } from 'next';
import { getAllVehiculos } from '../models/vehiculos';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const vehiculos = await getAllVehiculos();
    console.log('Después de llamar a getAllVehiculos:', vehiculos);
    res.status(200).json(vehiculos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener vehículos', error: error.message });
  }
}
