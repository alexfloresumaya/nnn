import { firebase, db, getCities } from './firebaseConfig';

const addUserDataToFirestore = async (uid, correo, nombre) => {
  try {
    const usersCollection = firebase.collection(db, 'usuarios'); // Asegúrate de usar el nombre correcto de tu colección
    console.log(usersCollection);
    // Crea un documento con el UID como identificador y agrega los datos
   /*  await usersCollection.doc(uid).set({
      uid: uid,
      correo: correo,
      contador: "0", // Valor inicial del contador
      fecha_inicio_racha: "null", // Valor inicial de la fecha de inicio de la racha (puede ser null o la fecha actual)
      nombre: nombre, // Nombre del usuario
      racha_mas_larga: "0", // Valor inicial de la racha más larga
    }); */


    console.log(`Datos del usuario con UID ${uid} agregados a Firestore.`);
  } catch (error) {
    console.error('Error al agregar datos a Firestore:', error);
  }
};

export { addUserDataToFirestore };
