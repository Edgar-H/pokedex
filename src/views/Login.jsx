import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Auth } from '../providers/AuthContext';
import { auth } from '../util/firebaseConfig';

export const Login = () => {
  const [error, setError] = useState('');
  const { user } = useContext(Auth);
  const { handleSubmit, register } = useForm();

  const onSubmit = async ({ email, password }) => {
    setError('');
    if (isFormValid(email, password)) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        setError('Invalid email or password');
      }
    }
  };

  const isFormValid = (email, password) => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password');
      return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <>
      {!user ? (
        <div className='login-form'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Link to='/'>
              <i className='fas fa-chevron-left'>Back</i>
            </Link>
            <h4>Login</h4>
            <div className='test'>
              <p>Account demo</p>
              <p>email: test@test.com</p>
              <p>password: 123456</p>
            </div>

            <label htmlFor='email'>Write yout email</label>
            <div className='login-item'>
              <input
                id='email'
                type='email'
                name='email'
                placeholder='example@example.com'
                {...register('email')}
              />
            </div>
            <label htmlFor='password'>Write yout password</label>
            <div className='login-item'>
              <input
                id='password'
                type='password'
                name='password'
                placeholder='password'
                {...register('password')}
              />
            </div>
            <div className='error-container'>
              {error && <p className='error-login'>{error}</p>}
            </div>
            <div className='btn-submit-social'>
              <div>
                <button type='submit'>Login</button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Navigate to='/pokedex' />
      )}
    </>
  );
};
