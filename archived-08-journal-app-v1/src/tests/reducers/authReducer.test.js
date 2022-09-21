import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


describe('Pruebas en authReducer', () => {

  test('debe pasar el login', () => {

    const initialState = {}
    const action = {
      type: types.login,
      payload:{
        uid:"12312as",
        displayName:"Carlos"
      }
    }

    const state = authReducer( initialState, action );

    expect(state).toEqual( {
      uid:"12312as",
      name:"Carlos"
    });
  
  });

  test('debe pasar el logout', () => {
    const initialState = {}
    const action = {
      type: types.logout
    }

    const state = authReducer( initialState, action );
    expect(state).toEqual({});
  });
  
  test('No debe hacer cambios en el state', () => {
    const initialState = {}
    const action = {
      type: 'asdadzx'
    }

    const state = authReducer( initialState, action );
    expect(state).toEqual({});
  });

});
