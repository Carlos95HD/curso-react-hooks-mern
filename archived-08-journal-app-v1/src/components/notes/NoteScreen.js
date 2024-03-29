import React, { useEffect , useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

  const dispatch = useDispatch();
  const { active:note } = useSelector(state => state.notes);
  const [ formValues, handleInputChange, reset] = useForm( note );

  const activeId = useRef(note.id)
  const {body, title, id} = formValues;
  
  useEffect(() => {

    if (note.id !== activeId.current ) {
      reset(note);
      activeId.current = note.id;
    }
  }, [reset, note]);

  useEffect(() => {

    dispatch(activeNote(formValues.id,{...formValues} ))
    
  },[formValues, dispatch])

  const handleDelete = () => {
    dispatch(startDeleting( id ));
  }

  return (
    <div className="notes__main-content animate__animated animate__fadeIn animate__faster">
      <NotesAppBar />

      <div className="notes__content">

        <input 
          type="text"
          name='title'
          placeholder="Some aesome title"
          className="notes__title-input"
          autoComplete="off"
          value={ title }
          onChange={handleInputChange}
        />

        <textarea 
          placeholder="What happened today"
          name="body"
          cols="30" 
          rows="10"
          className="notes__textarea"
          value={ body }
          onChange={handleInputChange}
        ></textarea>


        {
          (note.url) &&
            <div className="notes__image">
            <img 
              src={note.url}
              alt="imagen"
            />
            </div>
        }

      </div>

      <button 
        className="btn btn-danger"
        onClick={handleDelete}
      >
        Delete
      </button>

    </div>
  )
}
