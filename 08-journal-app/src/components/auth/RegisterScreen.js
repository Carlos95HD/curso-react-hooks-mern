import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "../../hooks/useForm";
import validator from 'validator'
import { removeError, setError } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui )

    const [ formValues, handleInputChange ] = useForm({
      name: 'Carlos',
      email:'carlos@gmail.com',
      password: '123456',
      password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
      e.preventDefault();
      if (isFormValid()) {
        dispatch(startRegisterWithEmailPasswordName(email, password, name));
      }
    }

    const isFormValid = () => {
      if (validator.isEmpty(name)) {
          dispatch(setError('Invalid name'))
          return false
      } else if (!validator.isEmail(email)) {
          dispatch(setError('Invalid email'))
          return false
      } else if ((!validator.equals(password, password2)) || (validator.isStrongPassword(password, [{ minLenght: 5 }]))) {
        console.log( 'invalid password' )
          dispatch(setError('Invalid password'))
          return false
      }

      dispatch(removeError());
      return true;
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster"
      >

        {//Si MsgError existe mostrar
          msgError &&
            (
              <div className="auth__alert-error">
                  { msgError }
              </div>
            )
        }

        <input type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete='off'
          value={name}
          onChange={handleInputChange}
        />

        <input type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete='off'
          value={email}
          onChange={handleInputChange}
        />

        <input type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <input type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />

        <button type="submit"
          className='btn btn-block btn-primary mb-5'
        >
            Register
        </button>

        <Link 
          to="/auth/login" 
          className="link">
            Already registered?
        </Link>
      </form>
    </>
  )
}
