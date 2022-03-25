import firebase from 'firebase/firestore';

export const retornarDocumentos = (snapshot: firebase.QuerySnapshot) => {
  const usuarios: any[] = [];

  snapshot.forEach(snapHijo => {
    usuarios.push({
      id: snapHijo.id,
      ...snapHijo.data()
    })
  })
  console.log(usuarios)
}