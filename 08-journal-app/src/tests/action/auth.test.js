import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {}
let store = mockStore(initialState);

//función faltante
global.scrollTo = jest.fn();

describe('Pruebas con las acciones de auth', () => {

  //Clear
  beforeEach(() => {
    store = mockStore(initialState);
  })

  test('Login y logout deben crear la acción respectiva', () => {

    const uid = "123456"
    const displayName = "Carlos"

    const loginAction = login( uid , displayName );
    const logoutAction = logout();

    expect(logoutAction).toEqual({type: types.logout});
    expect(loginAction).toEqual({
      type: types.login,
      payload:{
        uid,
        displayName
      }
    });

  });

  test('Debe realizar el startlogout', async() => {
    await store.dispatch( startLogout() );
    const actions = store.getActions();

    // console.log( actions )

    expect(actions[0]).toEqual({
      type: types.logout
    })

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning
    })

  });

  test('debe iniciar el startLoginEmailPassword', async() => {
    
    await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') );

    const actions = store.getActions();
    // console.log( actions )

    expect(actions[1]).toEqual({
      type: types.login,
      payload:{
        uid: expect.any(String),
        displayName: null
      }
    })
  });
  

});
