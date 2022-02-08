import React from 'react'
import { shallow } from 'enzyme'
import { MultipleCustomHooks } from '../../../components/03-examples/MultipleCustomHooks'
import { useFetch } from '../../../Hooks/useFetch'
import { useCounter } from '../../../Hooks/useCounter'
jest.mock('../../../Hooks/useFetch')
jest.mock('../../../Hooks/useCounter')

describe('Pruebas en MultiplesCustomhooks', () => {

  test('should mostrarse correctamente', () => {

    useCounter.mockReturnValue({
      counter: 10,
      increment: () => {}
    })

    useFetch.mockReturnValue({
      data: null,
      loading:true,
      error: null
    });

    const wrapper = shallow(<MultipleCustomHooks />);
    expect( wrapper ).toMatchSnapshot();
  });
  
  test('should mostrar información', () => {

    useFetch.mockReturnValue({
      data: [{
        author:'Carlos',
        quote:'Hola Mundo'
      }],
      loading:false,
      error: null
    });

    const wrapper = shallow(<MultipleCustomHooks />);

    expect(wrapper.find('.alert').exists() ).toBe(false)
    expect(wrapper.find('.mb-0').text().trim() ).toBe('Hola Mundo')
    expect(wrapper.find('footer').text().trim() ).toBe('Carlos')

  })

  
})
