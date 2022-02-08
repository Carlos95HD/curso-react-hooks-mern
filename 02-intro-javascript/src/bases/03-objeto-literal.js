const persona = {
  nombre: 'Tony',
  apellido: 'Stark',
  edad: 45,
  direccion:{
    ciudad : 'New York',
    zip: 2312312,
    lat: 14.1231,
    lng: 34.1312,
  }
}


const persona2 = {...persona};
persona2.nombre = 'Peter'

console.log( persona )
console.log(persona2)
