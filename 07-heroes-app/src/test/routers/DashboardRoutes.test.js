import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe('Pruebas en <DashboardRoutes>', () => {
  
  const contextValue = {
    user: {
      logged: true,
      name: 'Hernan'
    }
  }

  test('should mostrarse correctamente - Marvel', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <AuthContext.Provider value={ contextValue }>
          <DashboardRoutes />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('Hernan');
    expect(wrapper.find('h1').text().trim()).toBe('Marvel Screen')
  })

  test('should mostrarse correctamente - DC', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/dc']}>
        <AuthContext.Provider value={ contextValue }>
          <DashboardRoutes />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // console.log( wrapper.html() )
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text().trim()).toBe('DC Screen')

  })
})
