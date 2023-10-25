import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

/**
 * Registra un nuevo usuario con correo electrónico y contraseña.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Object} - Un objeto que contiene el resultado del registro, incluido el uid del usuario (si el registro fue exitoso) y un mensaje de error (si hubo alguno).
 */
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uid = user.uid; // Obtener el uid del usuario registrado
    return { success: true, user, uid };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Autentica a un usuario con correo electrónico y contraseña.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Object} - Un objeto que contiene el resultado del inicio de sesión, incluido el uid del usuario (si el inicio de sesión fue exitoso) y un mensaje de error (si hubo alguno).
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uid = user.uid; // Obtener el uid del usuario que ha iniciado sesión
    return { success: true, uid };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
