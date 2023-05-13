import { emailRegistro } from './email';

async function sendTestEmail() {
  const testData = {
    email: 'manuelg9704@gmail.com', // reemplaza esto con una dirección de correo electrónico de prueba real
    nombre: 'Test User',
    token: '123456789', // este debería ser un token de prueba; en una situación real, deberías generar un token seguro
  };

  try {
    await emailRegistro(testData);
    console.log('Correo de prueba enviado con éxito');
  } catch (error) {
    console.log('Error al enviar el correo de prueba:', error.message);
  }
}

sendTestEmail();
