import React from 'react';
import { mount } from "enzyme"
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router';

describe('Pruebas en <HeroScreen />', () => {
  
  const historyMock = {
    length:10,
    goBack:jest.fn(),
    push: jest.fn()
  }

  
  test('debe mostrar el componente redirect si no hay argumentos en el URL', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history={ historyMock }/>
      </MemoryRouter>
    )
    
    expect(wrapper.find('Redirect').exists()).toBe(true);
  })
  
  test('debe mostrar un hero si el parámetro existe y se encuentra', () => {
    
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
          <Route path="/hero/:heroeId" component={ HeroScreen }/>
      </MemoryRouter>
    )

    expect(wrapper.find('.row').exists()).toBe(true);
  })

  test('debe regresar a la pantalla anterior con PUSH', () => {
    
    const historyMock = {
      length:1,
      goBack:jest.fn(),
      push: jest.fn()
    }

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
          <Route 
            path="/hero/:heroeId" 
            component={ () => <HeroScreen history={ historyMock }/> }
            />
      </MemoryRouter>
    )

    wrapper.find('button').prop('onClick')();

    expect( historyMock.push ).toHaveBeenCalledWith("/");
    expect( historyMock.goBack ).not.toHaveBeenCalled();

  })
  
  test('debe regresar a la pantalla anterior GOBACK', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
          <Route 
            path="/hero/:heroeId" 
            component={ () => <HeroScreen history={ historyMock }/> }
            />
      </MemoryRouter>
    )

    wrapper.find('button').prop('onClick')();

    expect( historyMock.push ).not.toHaveBeenCalled();
    expect( historyMock.goBack ).toHaveBeenCalled();
  })
  
  test('debe llamar el redirect si el hero no existe', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spiderasdasd']}>
          <Route 
            path="/hero/:heroeId" 
            component={ () => <HeroScreen history={ historyMock }/> }
            />
      </MemoryRouter>
    )

    expect(wrapper.text()).toBe('')
  })
  
})
