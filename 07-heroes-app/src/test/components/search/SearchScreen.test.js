import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"
import { SearchScreen } from "../../../components/search/SearchScreen"

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Pruebas en el SearchScreen', () => {
  
  test('debe mostrarse correctamente con valores por defecto', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries = {['/search']}>
        <SearchScreen />
      </MemoryRouter> 
    )

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-info').text().trim()).toBe('Buscar un héroe')
  })

  test('should mostrar a Batman y el input con el valor del queryString', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries = {['/search?q=batman']}>
        <SearchScreen />
      </MemoryRouter> 
    )
    //validando el input se muestre correctamente
    expect(wrapper.find('input').prop('value')).toBe('batman')
  })

  test('Debe mostrar un error si no se encuentra el hero', () => {
    //No hay resutlados: batman123
    const wrapper = mount(
      <MemoryRouter initialEntries = {['/search?q=batman123']}>
        <SearchScreen />
      </MemoryRouter> 
    )

    expect(wrapper.find('.alert-danger').exists()).toBe(true);
    expect(wrapper.find('.alert-danger').text().trim()).toBe('No hay resultados batman123');
  })
  
  test('debe llamar el navigate a la nueva pantalla', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries = {['/search']}>
        <SearchScreen />
      </MemoryRouter> 
    )

    wrapper.find('input').simulate('change', {
      target:{
        name:'searchText',
        value:'batman'
      }
    });

    wrapper.find('form').prop('onSubmit')({
      preventDefault: () => {}
    });

    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('?q=batman');
  })
  
})