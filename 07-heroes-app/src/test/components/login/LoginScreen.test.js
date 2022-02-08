import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Pruebas en el LoginScreen', () => {
  
  const contextValue = {
    dispatch: jest.fn(),
    user:{
      logged: false,
    }
  };

  const wrapper = mount(
    <AuthContext.Provider value={ contextValue }>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test('debe hacer match con el snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe realizar el dispatch y la navegación', () => {
    const handleClick = wrapper.find('button').prop('onClick');
    handleClick();
    // Dispatch(...{name:"Carlos"})
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      'payload': {'name': 'Carlos'}, 'type': types.login
    });

    //mockNavigate = (/marvel, {replace: true})
    expect( mockNavigate ).toHaveBeenCalledWith('/marvel', {'replace': true})

    //Setear el LocalStorage
    localStorage.setItem('lastPath', '/dc')
    //handleClick
    handleClick()
    // mockNavigate( '/dc' , {replace true})
    expect( mockNavigate ).toHaveBeenCalledWith('/dc', {'replace': true})
  });

});
