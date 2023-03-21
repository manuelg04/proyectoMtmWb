import { NextApiRequest, NextApiResponse } from 'next';
import { queryDatabase } from '../../../db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) 
{
  const dataAfp = await queryDatabase('SELECT * FROM mtm.afp');
  const dataArl = await queryDatabase('SELECT * FROM mtm.arl');
  const dataUsuarios = await queryDatabase('SELECT * FROM mtm.usuario');
  const dataAntiguedadComercial = await queryDatabase('SELECT * FROM mtm.antiguedad_comercial');
  res.status(200).json({ dataAfp, dataArl, dataAntiguedadComercial, dataUsuarios });

  
}

