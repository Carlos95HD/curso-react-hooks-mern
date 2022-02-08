import {getHeroeByID } from "./bases/08-imp-exp"


// const promesa = new Promise( (resolve, reject) => {
//   setTimeout(() => {
    
//     //tarea
//     //importar el
//     const p1 = getHeroeByID(2);
//     // console.log( heroe )
//     // resolve( heroe )
//     resolve(p1)
//     // reject('no se pudo encontrar el heroe')
//   },2000);
// });

// promesa.then( (heroe) => {
//   console.log( 'Heroe:', heroe )
// } )
// .catch( (err) => console.warn( err ) )


const getHeroeByIdAsync = ( id ) => {
  return new Promise( (resolve, reject) => {
    setTimeout(() => {
      
      //tarea
      //importar el
      const p1 = getHeroeByID(id);

      if (p1 ) {
        resolve(p1)
      } else {
        reject('no se pudo encontrar el heroe')
      }
      // console.log( heroe )
      // resolve( heroe )
      
      // reject('no se pudo encontrar el heroe')
    },2000);
  });

}

getHeroeByIdAsync(2)
// .then( heroe => console.log( 'heroe', heroe ) )
.then( console.log )
.catch(console.warn);