import React from 'react'
import { shallow } from 'enzyme'
import { GifGrid } from '../../components/GifGrid'
import { useFetchGifs } from '../../hooks/useFetchGifs'
jest.mock('../../hooks/useFetchGifs');

describe('Test de <GifGrid />', () => {

  const categoria = 'Libro'
  test('Snapshot de category', () => {

    useFetchGifs.mockReturnValue({
      data: [],
      loading: true,
    });

    const wrapper = shallow(<GifGrid category={ categoria } />);
    expect(wrapper ).toMatchSnapshot();

  });
  
  test('debe mostrar items cuando cargan imagen useFetchGifs', () => {

    const gifs = [{
      id:'ABC',
      url: 'https:/localhost/cualquier/cosa.jpg',
      title:'Cualquier cosa'
    },
    {
      id:'123',
      url: 'https:/localhost/cualquier/cosa.jpg',
      title:'Cualquier cosa'
    }]

    useFetchGifs.mockReturnValue({
      data: gifs,
      loading: false,
    });

    const wrapper = shallow(<GifGrid category={ categoria } />)
     
    // expect( wrapper ).toMatchSnapshot()
    expect( wrapper.find('p').exists() ).toBe(false)
    expect( wrapper.find('GifGridItem').length ).toBe(gifs.length)

  });
  
})
