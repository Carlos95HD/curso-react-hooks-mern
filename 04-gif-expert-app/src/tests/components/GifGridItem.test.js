import React from 'react'
import { shallow } from 'enzyme';
import '@testing-library/jest-dom'
import { GifGridItem } from '../../components/GifGridItem';


describe('Debe mostrar el componente correctamente', () => {

  const url = 'https://localhost/img.jpg'
  const title = 'Imagen'
  const wrapper = shallow( <GifGridItem title={ title } url={ url }/> )

  test('debe mostrar PrimeraApp correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Debe tener el title', () => {
    const p = wrapper.find('p')
    expect( p.text().trim() ).toBe( title )
  })

  test('Debe tener la imagen igual a la url y alt de los props', () => {
    
    const img = wrapper.find('img');
    //console.log (img.prop('src'))
    expect(img.prop('src')).toBe(url);
    expect(img.prop('alt')).toBe(title);
  })
  
  test('Debe tener el animate__fadeIn', () => {
    const div = wrapper.find('div');
    //animate__fadeIn
    const className = div.prop('className')
    expect(className.includes("animate__fadeIn")).toBe(true)
  })
  

});