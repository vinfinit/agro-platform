import Router from 'next/router'
import React, { useState } from 'react'
import { Button, FormGroup, FormControl } from 'react-bootstrap'
import { GoogleOAuthProvider } from '@react-oauth/google'

import Loader from '../components/Loader'
import styles from '../styles/Login.module.scss'

import { API_URL } from '../utils/constants'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, toggleLoading] = useState(false);
  const [errorLog, setErrorLog] = useState('');

  const defaultError = 'Authorization failed!';

  const validateForm = () => email.length > 0 && password.length > 0;

  const localLogin = async (event) => {
    event.preventDefault();
    toggleLoading(true);
    const res = await fetch(`${API_URL}/api/auth/login?provider=local`, {
      headers: new Headers({
        'Authorization': `Basic ${btoa(`${email}:${password}`)}`,
      })
    });
    
    if (res.ok) {
      Router.push('/dashboard');
    } else {
      setErrorLog(defaultError);
      toggleLoading(false);
    }
  }

  return (
    <GoogleOAuthProvider>
      {isLoading && <Loader />}
      <div className={`${styles.wrapper} fadeInDown`}>
        <div className={styles.login}>
          <section className={styles.separator}>
            <hr/>
          </section>
          <form onSubmit={localLogin}>
            <FormGroup className={styles.formGroup} controlId="email" size="lg">
              <FormControl
                autoFocus
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className={styles.formGroup} controlId="password" size="lg">
              <FormControl
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            <Button block size="lg" disabled={!validateForm()} type="submit">
              Войти
            </Button>
          </form>
          {errorLog && 
            <section className={styles.errorMessage}>
              {errorLog}
            </section>
          }
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;