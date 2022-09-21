import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { startCreatingWighEmailPassword } from '../../store/auth';
import { useMemo } from 'react';

const formData = {
  email:"carlos@gmail.com",
  password:"123456",
  displayName:"Carlos Hernan"
}

const formValidations = {
  email: [ (value) => value.includes("@") , 'El correo debe tener una @'],
  password: [ (value) => value.length >= 6,'La contraseña debe tener mas de 6 letras'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuth = useMemo(() => status === 'checking', [status]);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { email, password, displayName, onInputChange, formState,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;
    dispatch(startCreatingWighEmailPassword(formState));
  }

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name='displayName'
                value={displayName}
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmitted }
                helperText={ displayNameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name='email'
                value={email}
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={password}
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid }
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

              <Grid 
                item xs={ 12 }
                display={ !!errorMessage ? '' : 'none'}
              >
                <Alert severity='error'>
                  { errorMessage }
                </Alert>
              </Grid>

              <Grid item xs={ 12 }>
                <Button
                  disabled={ isCheckingAuth }
                  variant='contained'
                  fullWidth
                  type='submit'
                >
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
