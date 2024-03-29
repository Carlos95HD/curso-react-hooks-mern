import React, { useEffect } from 'react'
import { useForm } from '../../Hooks/useForm';
import './effects.css'

export const FormWithCustomHook = () => {

  const [ formvalues, handleInputChange ] = useForm({
    name:'',
    email:'',
    password:''
  });

  const { name, email, password } = formvalues;

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log( formvalues )
  }

  useEffect(() => {
    console.log( 'email cambió' )
  }, [email])

  return (
    <form onSubmit={ handleSubmit }>
      <h1>FormWithCustomHook</h1>
      <hr />

      <div className = 'form-group'>
        <input 
          type="text"
          name='name'
          className='form-control'
          placeholder='Tu nombre'
          autoComplete="off"
          value={ name }
          onChange={ handleInputChange }
        />
      </div>

      <div className = 'form-group'>
        <input 
          type="text"
          name='email'
          className='form-control'
          placeholder='Email@gmail.com'
          autoComplete="off"
          value={ email }
          onChange={ handleInputChange }
        />
      </div>

      <div className = 'form-group'>
        <input 
          type="password"
          name='password'
          className='form-control'
          placeholder='******'
          value={ password }
          onChange={ handleInputChange }
        />
      </div>

      <button type='submit' className='btn btn-primary'>Guardar</button>
    </form>
  )
}
