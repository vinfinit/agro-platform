import React, { useState } from 'react'
import { Button, FormGroup, FormControl } from 'react-bootstrap'
import GoogleLogin from 'react-google-login'
import config from '../config.json'
import styles from '../styles/Login.module.scss'

import { API_URL } from '../utils/constants'

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => email.length > 0 && password.length > 0;

  const localLogin = async (event) => {
    event.preventDefault();
    await fetch(`${API_URL}/api/auth/login?provider=local`, {
      headers: new Headers({
        'Authorization': `Basic ${btoa(`${email}:${password}`)}`,
      })
    });
    props.onSuccess()
  }

  const successGoogleAuth = async (response) => {
    const token = response.tokenId;
    await fetch(`${API_URL}/api/auth/login?provider=google`, {
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
      })
    });
    props.onSuccess()
  }

  const failGoogleAuth = async (err) => {
    console.error(err)
  }

  return (
    <div className={`${styles.wrapper} fadeInDown`}>
      <div className={styles.login}>
        <section className={styles.socialNetwork}>
          <GoogleLogin
            clientId={config.GOOGLE_IDENTITY_CLIENT_ID}
            onSuccess={successGoogleAuth}
            onFailure={failGoogleAuth}
            cookiePolicy={'single_host_origin'}
          />
        </section>
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
        {props.errorLog && 
          <div className="error-messages">
            {props.errorLog}
          </div>
        }
      </div>
    </div>
  );
}