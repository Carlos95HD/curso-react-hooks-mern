/**
 * @jest-environment node
 */

import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
import * as fs from 'fs'
import { fileUpload } from '../../helpers/fileUpload';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn()
}))

const initialState = {
  auth:{
    uid: 'TEST',
  },
  notes:{
    active: {
      id: 'Fbi4LKAFNcvi9PP5lviG',
      title:'Hola',
      body: 'Mundo'
    }
  }
}
let store = mockStore(initialState);

describe('Pruebas en Action-notes', () => {

  beforeEach(() => {
    store = mockStore(initialState)
  })

  test('debe crear una nueva nota', async () => {

    await store.dispatch( startNewNote() );
    const action = store.getActions();
    // console.log( action )

    expect( action[0] ).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      }
    });

    expect( action[1] ).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      }
    })

    const id = action[0].payload.id;
    const noteRef = doc(db,`TEST/journal/notes/${ id }`);
    await deleteDoc(noteRef);
  });

  test('startLoadingNotes debe cargar las notas', async () => {

    await store.dispatch( startLoadingNotes('TEST') );
    const action = store.getActions();

    expect( action[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array)
    })

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number)
    }
    expect( action[0].payload[0] ).toMatchObject(expected);
  });

  test('startSaveNote debe de actualizar la nota', async () => {
    
    const note = {
      id:'Fbi4LKAFNcvi9PP5lviG',
      title:'titulo',
      body:'body'
    }

    await store.dispatch( startSaveNote( note ) );
    const action = store.getActions();

    expect( action[0].type ).toBe( types.notesUpdated );

    const docRef = await doc( db, `TEST/journal/notes/${note.id}` )
    const docSnap = await getDoc(docRef);

    expect( docSnap.data().title ).toBe( note.title );
  });

  test('startUploading debe actualizar el url del entry', async () => {

    fileUpload.mockReturnValue('https://hola-mundo.com')
    fs.writeFileSync('foto.jpg', '')
    const file = fs.readFileSync('foto.jpg')

    await store.dispatch( startUploading( file ) );

    const docRef = doc( db, 'TEST/journal/notes/Fbi4LKAFNcvi9PP5lviG' );
    const docRecived = await getDoc( docRef );

    expect(docRecived.data().url).toBe('https://hola-mundo.com');

  });
});
