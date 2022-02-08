import React from 'react';
import { shallow } from 'enzyme';
import GifExpertApp from '../GifExpertApp'

describe('Test <GifExpertApp />', () => {

  test('Se debe mostrar correctamente GifExpertApp', () => {

    const categories = [ 'Gato', 'Oso' ]

    const wrapper = shallow(<GifExpertApp defaultCategories = { categories } />)
    
    expect( wrapper ).toMatchSnapshot()
    expect( wrapper.find('GifGrid').length ).toBe( categories.length )
    
  })

})