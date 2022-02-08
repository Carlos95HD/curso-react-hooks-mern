// import heroes, { owners } from "../data/heroes";
import heroes from "../data/heroes";

// console.log(owners)

// const getHeroeByID = (id) => {
//   return heroes.find(heroe => heroe.id === id);
// }
export const getHeroeByID = (id) => heroes.find(heroe => heroe.id === id);

// console.log( getHeroeByID(2) )

// Find no sirve, usar Filter
export const getHeroesByOwner = ( owner ) => heroes.filter( heroe => heroe.owner === owner);

// console.log( getHeroesByOwner('Marvel') )