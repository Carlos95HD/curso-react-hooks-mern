import Swal from 'sweetalert2'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { googleAuthProvider, signInWithPopup, getAuth } from '../firebase/firebase-config';
import { types } from "../types/types";
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

const auth = getAuth();

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })
    
    return signInWithEmailAndPassword(auth, email, password) //Inicio sesión
    .then( async ({ user }) => {
      await dispatch(login(user.uid, user.displayName))
      dispatch(finishLoading());
      Swal.close();
    })
    .catch( e => {
      //Alert Error
      switch (e.code) {
        case "auth/user-not-found":
          Swal.fire({
            icon: 'error',
            text: 'Usuario no encontrado!',
          }) 
          break
        case "auth/wrong-password":
          Swal.fire({
            icon: 'error',
            text: 'Contraseña incorrecta!',
          }) 
          break;
        case "auth/too-many-requests":
          Swal.fire({
            icon: 'error',
            title: 'Demasiados intentos!',
            text:'Intente mas tarde.'
          })
          break;

        default:
          break;
      }

      dispatch(finishLoading())
    })
  }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
  return (dispatch) => { // dispatch proviene de redux-thunk
    createUserWithEmailAndPassword(auth, email, password) // Creacion del usuario
    .then( async ({ user }) => {
      await updateProfile(user, {displayName: name}) //Actualización perfil firestone
      console.log( user )
      dispatch(login( user.uid, user.displayName)) //dispatch del login
    })
    .catch( e => {

      if ( e.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: 'error',
          text: 'E-mail ya esta registrado!',
        })
      }
    })
  }
}

export const startGoogleLogin = () => {

  return ( dispatch ) => {
    signInWithPopup( auth, googleAuthProvider )
    .then( ({ user }) => {
      dispatch(login( user.uid, user.displayName))

    })
    .catch(error => {
      console.log( error )

    });
  }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload:{
      uid,
      displayName
    }
})

//inicia el proceso de logout
export const startLogout = () => {
  return async (dispatch) => {
    await auth.signOut();

    dispatch( logout() );
    dispatch( noteLogout() )
  }
}

export const logout = () => ({
  type: types.logout
})