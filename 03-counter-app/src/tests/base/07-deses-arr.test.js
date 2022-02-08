import { retornaArreglo } from "../../base/07-deses-arr"

describe('Pruebas en desestructuración', () => {
  
  test('Debe de retornar un string y un numero', () => {
    
    const [ letras, numeros ] = retornaArreglo(); // ['ABC', 123]
 
    expect( typeof numeros ).toEqual( "number" )
    expect( typeof letras ).toEqual( "string" )

  });

});