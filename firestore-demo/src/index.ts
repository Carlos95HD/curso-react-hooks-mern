import db from './firebase/config'
import { retornarDocumentos } from "./helpers/mostrar-documentos";
import { 
  collection,
   addDoc,
   doc,
   updateDoc,
   getFirestore,
   setDoc,
   deleteDoc,
   onSnapshot,
   query,
   getDocs,
   where,
   orderBy,
   limit,
   startAfter,
   endBefore } from "firebase/firestore";

const usuarioRef = collection(db, "usuarios");

//btn next
const btnNext = document.createElement('button');
btnNext.innerText = "Next Page";
document.body.append( btnNext );

let lastDocument: any = null;
let firstDocument: any = null;

btnNext.addEventListener('click', async () => {
  const q = query(usuarioRef, orderBy("nombre"), limit(2), startAfter(lastDocument));
  await getDocs(q).then( snap =>{ 

    firstDocument = snap.docs[0] || null;
    lastDocument = snap.docs[ snap.docs.length - 1 ] || null;
    retornarDocumentos(snap)

  });
})

//btn previous
const btnPrev = document.createElement('button');
btnPrev.innerText = "Previous Page";
document.body.append(btnPrev);

btnPrev.addEventListener('click', async () => {
  const q = query(usuarioRef, orderBy("nombre"), limit(2), endBefore(firstDocument));
  await getDocs(q).then( snap =>{

    firstDocument = snap.docs[0] || null;
    lastDocument = snap.docs[ snap.docs.length - 1 ] || null;
    retornarDocumentos(snap)

  });
})