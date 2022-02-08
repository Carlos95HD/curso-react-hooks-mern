import { mount } from "enzyme"
import { MemoryRouter, Route, Routes } from "react-router";

import { AuthContext } from "../../auth/AuthContext";

import { Navbar } from "../../components/ui/Navbar";
import { types } from "../../types/types";

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Pruebas en <Navbar />', () => {
  //Pedro en el authContext
  const contextValue = {
    dispatch : jest.fn(),
    user:{
      logged: true,
      name : "Pedro"
    }
  }

  const wrapper = mount(
    <AuthContext.Provider value={ contextValue }>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Navbar />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test('debe de mostrar correctamente', () => {
    //SnapShot
    expect(wrapper).toMatchSnapshot();
    //buscar .text-info y ser = Pedro
    expect(wrapper.find('.text-info').text().trim()).toBe('Pedro');
  });

  test('debe llamar el Logout, llamar el navigate y el dispatch con los argumentos', () => {
    wrapper.find('button').prop('onClick')()

    expect( contextValue.dispatch ).toHaveBeenCalledWith({'type': types.logout});

  });
})