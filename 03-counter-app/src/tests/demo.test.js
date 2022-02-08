
describe('Pruebas en el archivo demo.test.js', () => {

  test('Test de mi aplicación', () => {
  
    // 1. inicialización
    const mensaje = 'Hola mundo'
  
    // 2. inicialización
    const mensaje2 = `Hola mundo`
  
    // 3. Observar el comportamiento 
    expect( mensaje ).toBe( mensaje2 ); // === toBe busca la comparación
  })

});
