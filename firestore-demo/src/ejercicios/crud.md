# Firestone web version 9 (Modular)

## Referencia al documento
const usuarioRef = collection(db, "usuarios");
## Objeto
const usuario =  {
  nombre: "Juan",
  activo: false,
  edad: 30,
  salario: 1950
};

## Create new usuario
try {
  const addUser = async () => {
  const docRef = await addDoc(usuarioRef, usuario);
  console.log("Document written with ID: ", docRef.id);
  }
  addUser();
} catch (e) {
  console.error("Error adding document: ", e);
}


Update usuarios set activo = false
const usuariosRef = doc(usuarioRef,'VQxG9flT0pFrx24zHiXw') id_documento
updateDoc(usuariosRef, { activo: false });

Update destructivo
const usuariosRef = doc(usuarioRef,'VQxG9flT0pFrx24zHiXw')
setDoc(usuariosRef, { nombre:"Alan", activo: true, edad:21  });

Borrar un usuario
deleteDoc(doc(usuarioRef,'VQxG9flT0pFrx24zHiXw'))
.then(() => console.log("borrado"))
.catch(err => console.log('error', err))

Select * from usuarios;
 onSnapshot(usuarioRef, (snap) => {
   retornarDocumentos(snap)
 });
onSnapshot(usuarioRef, retornarDocumentos); Codigo Optimizado

Obtener datos una sola vez
 const getDocumentos = async () => {
   await getDocs(usuarioRef).then(retornarDocumentos);
 }
 getDocumentos();

Where
const getDocumentos = async () => {
  const q = query(usuarioRef, where("activo", "==", true));
  await getDocs(q).then(retornarDocumentos);
}
getDocumentos();


  Select * from usuarios
  -- Where salario > 1800 and salario < 2300
  where salario between 1800 and 2300

const getDocumentos = async () => {
  const q = query(usuarioRef,
    where("salario", ">=", 1800),
    where('salario','<=', 2300)
    );
  await getDocs(q).then(retornarDocumentos);
}
getDocumentos();

  Select * from usuarios
  -- Where salario > 1800
  and activo == true

const getDocumentos = async () => {
  const q = query(usuarioRef,
    where("salario", ">=", 1800),
    where('activo','==', true)
    );
  await getDocs(q).then(retornarDocumentos);
}
getDocumentos();