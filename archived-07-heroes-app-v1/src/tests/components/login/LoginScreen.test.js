import React from 'react'
import { mount } from 'enzyme'
import { AuthContext } from '../../../auth/AuthContext'
import { LoginScreen } from '../../../components/login/LoginScreen'
import { types } from '../../../type/types'


describe('Pruebas en <LoginScren />', () => {

  const contextValue = {
    dispatch:jest.fn()
  }

  const history = {
    replace:jest.fn(),
    location:{},
    listen:jest.fn(),
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
        <LoginScreen history={history}/>
    </AuthContext.Provider>
  );

  test('Debe mostrarse correctamente', () => {
    //snapshot
    expect(wrapper).toMatchSnapshot()
  })
  

  test('debe realizar el dispatch y la navegación', () => {
    // console.log( wrapper.html() )
    wrapper.find('button').simulate('click');

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type:types.login,
      payload: {
        name:"Carlos"
      }
    });
    expect(history.replace).toHaveBeenCalledWith('/');

    //simulando el localstorage con elementos
    localStorage.setItem('lastPath', '/dc')
    wrapper.find('button').simulate('click');

    expect(history.replace).toHaveBeenCalledWith('/dc');
  });

});


