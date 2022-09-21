import { Provider } from 'react-redux';
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';
import { login } from '../../actions/auth'
import Swal from 'sweetalert2';
import { waitFor } from '@testing-library/react';


jest.mock('../../actions/auth', () => ({
  login: jest.fn()
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {},
  ui:{
    loading: false,
    msgError: null
  },
  notes:{
    active:{
      id:'asd'
    },
    notes:[]
  }
}

let store = mockStore(initialState);
store.dispatch = jest.fn();


describe('Pruebas en AppRouter', () => {

  test('debe llamar al login si esta autenticado', async () => {

    let user;
    await act( async () => {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(auth, 'test@testing.com', '123456');
      user = userCredentials.user;

      const wrapper = mount(
        <Provider store={store}>
            <AppRouter />
        </Provider>
      )
    })

    expect( login ).toHaveBeenCalledWith('SAEeuVayqtQEeQd0CkUfHQ2Gsk93', null);
  });

});
