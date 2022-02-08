//Funciones en JS

// const saludar = function ( nombre ) {
//   return `Hola, ${ nombre }`
// }

const saludar2 = ( nombre ) => {
  return `Hola, ${ nombre }`
}

const saludar3 = nombre  => `Hola, ${ nombre }`
const saludar4 = () => `Hola Mundo`
console.log( saludar2('carlos') )
console.log( saludar3('hernan') )
console.log( saludar4() )

const getuser = () => ({ uid: 'sdasx2', username: 'Juan'})
const user = getuser()

console.log(user);


//Tarea
// 1-Transformar a una función de flecha
// 2-tiene que retornar una objeto implícito
// 3-Pruebas

// function getUsuarioActivo ( nombre ) {
//   return {
//     uid: '123123asd',
//     username: nombre
//   }
// }

const getUsuarioActivo = nombre => ({uid: '123123asd',username: nombre });

const usuarioActivo = getUsuarioActivo('Pedro');
console.log( usuarioActivo )



