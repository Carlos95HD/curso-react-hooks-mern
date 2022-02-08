import { getUser, getUsuarioActivo } from '../../base/05-funciones'
import '@testing-library/jest-dom';

describe('Prueba en 05-funciones', () => {
   
  test('debe de retornar un objeto', () => {
    
    const userTest = {
      uid: 'ABC123',
      username: 'El_Papi1502'
    }

    const user = getUser();

    expect( user ).toEqual( userTest )
  })

  // getusuarioActivo debe de retornar un objeto

  test('Prueba en función getUsuarioActivo', () => {

    const usuarioActivo = {
      uid: 'ABC567',
      username: 'carlos'
    }

    const getUser = getUsuarioActivo('carlos')

    expect( usuarioActivo ).toEqual( getUser )
  })

})
