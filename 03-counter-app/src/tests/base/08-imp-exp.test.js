import { getHeroeById, getHeroesByOwner } from "../../base/08-imp-exp";
import heroes from '../../data/heroes'
describe('Pruebas en funciones de Héroes', () => {
  
  test('debe de retornar un héroe por ahí ', () => {
    
    const id = 1;

    const heroe = getHeroeById( id )

    const heroesData = heroes.find( h => heroe.id == id )

    expect ( heroe ).toEqual( heroesData );
  });

  test('debe de retornar undefined ', () => {
    
    const id = 20;

    const heroe = getHeroeById( id )

    expect ( heroe ).toBe( undefined );
  });


  // debe retornar un arreglo con los héroes de DC
  //Owner
  // toEqual al arreglo de filtrado

  test('debe retornar un arreglo con los héroes de DC', () => {
    
    const owner = 'DC'

    const heroesByOwner = getHeroesByOwner(owner)

    const heroesData = heroes.filter( h => h.owner === owner )

    expect( heroesByOwner ).toEqual( heroesData )
  })


  test('debe retornar array con los héroes de Marvel', () => {

    const owner = 'Marvel'
    const heroesByOwner = getHeroesByOwner(owner)

    // const heroesData = heroes.filter( h => h.owner === owner )

    expect( heroesByOwner.length ).toBe( 2 )
  });

  //debe retornar un arreglo con los héroes de Marvel
  // length = // toBe

});