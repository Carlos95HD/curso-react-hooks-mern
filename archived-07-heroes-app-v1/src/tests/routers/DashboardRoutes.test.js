import React from 'react';
import { mount } from 'enzyme';
import { AuthContext } from '../../auth/AuthContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { MemoryRouter } from 'react-router';


describe('Pruebas en <DashboardRoutes />', () => {
  
  const contextValue = {
    dispatch: jest.fn(),
    user:{
      logged:true,
      name:'Hernan'
    }
  };

  test('should mostrarse correctamente', () => {

    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect( wrapper ).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('Hernan')
  });

});