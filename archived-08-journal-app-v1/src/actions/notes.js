import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {

    const { uid } = getState().auth;

    const newNote = {
      title:'',
      body: '',
      date: new Date().getTime()
    }

    //Agrega notas a firebase con addDoc()
    try {
      const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote)
      dispatch( activeNote( doc.id, newNote ) );
      dispatch ( addNewNote(doc.id, newNote) )

    } catch (e) {
      console.log(e)
    }
  }
}

export const activeNote = (id , note) => ({
  type: types.notesActive,
  payload:{
    id,
    ...note
  }
});

export const addNewNote = ( id, note ) => ({
  type: types.notesAddNew,
  payload:{
    id,
    ...note
  }
});

export const startLoadingNotes = ( uid ) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch( setNotes( notes) )
  }
}

export const setNotes = ( notes ) => ({
  type: types.notesLoad,
  payload: notes
});


export const startSaveNote = ( note ) => {
  return async (dispatch, getState ) => {
    const { uid } = getState().auth;
    //Borra el url si esta vacio (firebase no recibe null)
    if ( !note.url ){
      delete note.url;
    }

    const noteToFirestore = {...note};
    delete noteToFirestore.id; //elimina el id del objeto nota
    const noteRef = doc( db, `${uid}/journal/notes/${note.id}` );

    try {
      await updateDoc(noteRef, noteToFirestore);
      dispatch( refreshNote( note.id, noteToFirestore ));
      Swal.fire("Saved!",note.title, "success" );
    } catch (error) {
      Swal.fire("Error to save!",note.title, "error" );
    }

  }
}

export const refreshNote = ( id, note ) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note:{
      id,
      ...note
    }
  }
})

export const startUploading = ( file ) => {
  return async (dispatch, getState) => {

    const { active:activeNote } = getState().notes;

    Swal.fire({
      title: 'Uploading',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })
    
    const fileUrl = await fileUpload( file );
    activeNote.url = fileUrl;

    dispatch( startSaveNote(activeNote) );

    Swal.close();
  }
}

export const startDeleting = ( id ) => {
  return async (dispatch, getState) => {

    const uid = getState().auth.uid
    const noteRef = doc(db,`${uid}/journal/notes/${id}`);

    try {
      await deleteDoc(noteRef);
      dispatch( deleteNote(id) );

    } catch (error) {
      console.log( error )
    }

  }
}

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning
})