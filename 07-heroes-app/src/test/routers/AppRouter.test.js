import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";

describe('Pruebas en <AppRouter>', () => {
  
  const contextValue = {
    user:{
      logged: false
    }
  }

  test('should mostrar el login si no está autenticado', () => {

    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect( wrapper ).toMatchSnapshot();
    expect(wrapper.find('h1').text().trim()).toBe('Login');
  })

  test('should mostrar el componente de Marvel', () => {

      const contextValue = {
        user:{
          logged: true,
          name: "Carlos"
        }
      }

    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <AppRouter />
      </AuthContext.Provider>
    );
    
    expect( wrapper ).toMatchSnapshot();
    expect(wrapper.find('.navbar').exists()).toBe(true);
  })
  
  
})
