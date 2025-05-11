import admin from 'firebase-admin';
// Importe o arquivo JSON da sua chave de serviço (substitua o caminho)
const serviceAccount = require('../nutriapp-42e7f-firebase-adminsdk-fbsvc-617497dbbd.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export { admin, db };