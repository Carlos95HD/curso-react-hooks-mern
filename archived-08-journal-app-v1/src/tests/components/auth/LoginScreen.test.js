import { Provider } from 'react-redux';
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
}

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>

    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>

  </Provider>
)

describe('Pruebas en <LoginScreen />', () => {

  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  })

  test('Debe mostrar correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('debe llamar la acción startGoogleLogin', () => {
    wrapper.find('.google-btn').prop('onClick')();
    expect( startGoogleLogin ).toHaveBeenCalled();
  });

  test('debe disparar el startLogin con los respectivos argumentos', () => {

    wrapper.find('form').prop('onSubmit')({preventDefault(){}});
    expect( startLoginEmailPassword ).toHaveBeenCalledWith('','');
  });
  


});
