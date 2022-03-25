# select * from usuarios order by nombre asc, salario asc
```
const getDocumentos = async () => {
  const q = query(usuarioRef,
    orderBy("nombre"),
    orderBy("salario"),
    );
  await getDocs(q).then(retornarDocumentos);
}
getDocumentos();
```