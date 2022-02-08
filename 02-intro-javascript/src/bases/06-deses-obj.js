//Desesctructurarión
// Asignación Desestructurante

const persona = {
  nombre: 'Tony',
  edad:45,
  clave:'Ironman'
}

// const { nombre, edad, clave } = persona;

// console.log( nombre ) 
// console.log( edad )
// console.log( clave )

const useContext = ({ clave,nombre, edad, rango = 'Capitan' }) => {

    // console.log(nombre, edad, rango)
    return {
      nombreClave: clave,
      anios: edad,
      latlng: {
        lat: 14.23213,
        lng: -12.23123
      }
    }
}

const { nombreClave, anios, latlng:{ lat, lng } } = useContext(persona)
console.log( nombreClave, anios )
console.log( lat, lng )