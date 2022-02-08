import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { types } from "../../../types/types";

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
// store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store} >
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
)

describe('Pruebas en <RegisterScreen />', () => {
  test('Debe mostrarse correctamente', () => {
    expect( wrapper ).toMatchSnapshot();
  });

  test('debe hacer dispatch de la acción respectiva', () => {
    const emailField = wrapper.find('input[name="email"]');

    //cambio de email en input
    emailField.simulate('change', {
      target:{
        value:'',
        name: 'email'
      }
    });

    //simulate del onSubmit
    wrapper.find('form').prop('onSubmit')({preventDefault(){}});

    const actions = store.getActions();
    // console.log( action )

    expect( actions[0] ).toEqual({
      type: types.uiSetError,
      payload:'Invalid email'
    });

  });

  test('debe mostrar la caja de alerta con el error', () => {

    const initialState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Email no es correcto'
      }
    }

    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store} >
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect( wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect( wrapper.find('.auth__alert-error').text().trim()).toBe( initialState.ui.msgError );
  });
});
