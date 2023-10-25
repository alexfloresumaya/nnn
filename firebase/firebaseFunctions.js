import { firebase } from './firebaseConfig';

export const addUserDataToFirestore = async (uid, correo) => {
  function emailToName(email) {
    const [username, domain] = email.split("@");
    const formattedName = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
    return formattedName;
  }
  try {
    console.log('adduserData')
    const usuariosRef = firebase.firestore().collection('usuarios');
    const newUser = {
      amigos: [], 
      solicitudesAmistad: [], 
      uid: uid, 
      correo: correo, 
      nombre: emailToName(correo), 
      contador: 0, 
    };

    const newDocRef = await usuariosRef.add(newUser);
    console.log("Documento agregado con ID: ", newDocRef.id);


    console.log(`Datos del usuario con UID ${uid} agregados a Firestore.`);
  } catch (error) {
    console.error('Error al agregar datos a Firestore:', error);
  }
};

async function enviarSolicitudAmistad(miUID, amigoUID) {
  try {
    const usuarioRef = firebase.firestore().collection('usuarios').doc(miUID);
    const amigoRef = firebase.firestore().collection('usuarios').doc(amigoUID);

    // Verifica si la solicitud ya existe
    const solicitudExistente = await usuarioRef.get().then(doc => doc.data().amigos.some(amigo => amigo.uid_usuario === amigoUID));
    if (solicitudExistente) {
      console.log('La solicitud ya ha sido enviada anteriormente.');
      return;
    }

    await usuarioRef.update({
      amigos: firebase.firestore.FieldValue.arrayUnion({ uid_usuario: amigoUID, estado: 'pendiente' })
    });

    console.log('Solicitud de amistad enviada.');
  } catch (error) {
    console.error('Error al enviar la solicitud de amistad:', error);
  }
};

async function aceptarSolicitudAmistad(miUID, amigoUID) {
  try {
    const usuarioRef = firebase.firestore().collection('usuarios').doc(miUID);

    await usuarioRef.update({
      amigos: firebase.firestore.FieldValue.arrayUnion({ uid_usuario: amigoUID, estado: 'aceptada' })
    });

    console.log('Solicitud de amistad aceptada.');
  } catch (error) {
    console.error('Error al aceptar la solicitud de amistad:', error);
  }
}

async function rechazarSolicitudAmistad(miUID, amigoUID) {
  try {
    const usuarioRef = firebase.firestore().collection('usuarios').doc(miUID);
    await usuarioRef.update({
      amigos: firebase.firestore.FieldValue.arrayRemove({ uid_usuario: amigoUID, estado: 'pendiente' })
    });

    console.log('Solicitud de amistad rechazada.');
  } catch (error) {
    console.error('Error al rechazar la solicitud de amistad:', error);
  }
}
const fetchLastReset = (auth) => {
  const user = auth.currentUser;
  const userUid = user.uid; // Reemplaza 'el-uid-del-usuario' con el valor real del UID que deseas buscar.

  const usersRef = firebase.firestore().collection('usuarios'); // Cambia 'usuarios' al nombre de tu colección.

  // Realiza una consulta para buscar documentos que tengan un campo 'uid' igual al valor de userUid.
  const query = usersRef.where('uid', '==', userUid);

  query.get().then((querySnapshot) => {
    if (querySnapshot.docs.length > 0) {
      // Se encontraron documentos que coinciden con el valor del UID.
      const firstDocument = querySnapshot.docs[0];
      const userData = firstDocument.data();
      return userData.contador;
    } else {
      console.log('No se encontraron documentos con ese UID.');
    }
  }).catch((error) => {
  console.error('Error al realizar la consulta:', error);
  });

};


export { enviarSolicitudAmistad, aceptarSolicitudAmistad, rechazarSolicitudAmistad, fetchLastReset };


