const { configureStore } = require("@reduxjs/toolkit");
const { render, screen, fireEvent } = require("@testing-library/react");
const { Provider } = require("react-redux");
const { MemoryRouter } = require("react-router-dom");
const { LoginPage } = require("../../../src/auth/pages/LoginPage");
const { authSlice } = require("../../../src/store/auth");
const { startGoogleSignIn } = require("../../../src/store/auth/thunks");
const { notAuthenticatedState } = require("../../fixtures/authFixtures");

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () =>  mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password})
  }
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState:{
    auth: notAuthenticatedState
  }
});

describe('Pruebas en el <LoginPage />', () => {
  beforeEach(() =>  jest.clearAllMocks() );

  test('Debe mostrar el componente correctamente', () => {

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    // screen.debug();
    expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
  });


  test('boton de google debe llamar el startGoogleSignIn', () => {

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const googleBtn = screen.getByLabelText('google-btn');
    fireEvent.click(googleBtn);
    expect( mockStartGoogleSignIn).toHaveBeenCalled();

  });

  test('Debe llamar startLoginWithEmailPassword', () => {

    const email = 'Carlos@gmail.com';
    const password = '123456'

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', {name:'Correo'});
    fireEvent.change( emailField, { target: { name: 'email', value: email }})

    const passwordField = screen.getByTestId('password');
    fireEvent.change( passwordField, { target: { name: 'password', value: password }})

    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit( loginForm );

    expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
      email: email,
      password: password
    });
  });


});