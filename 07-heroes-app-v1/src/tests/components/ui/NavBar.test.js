import React from 'react'
import { mount } from "enzyme"
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/NavBar';
import { MemoryRouter, Router } from 'react-router';
import { types } from '../../../type/types';


describe('Pruebas en <NavBar />', () => {

  const historyMock = {
    push:jest.fn(),
    replace:jest.fn(),
    location:{},
    listen:jest.fn(),
    createHref: jest.fn()
  };

  const contextValue = {
    dispatch: jest.fn(),
    user:{
      logged:true,
      name:'Hernan'
    }
  };

  const wrapper = mount(
    <AuthContext.Provider value={ contextValue }>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks()
  });

  test('should mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
    expect( wrapper.find('.text-info').text().trim()).toBe('Hernan')
  });


  test('debe llamar el logout y usar history', () => {
    wrapper.find('button').prop('onClick')();

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.logout
    });

    expect( historyMock.replace ).toHaveBeenCalledWith('/login');
  })
  

})
