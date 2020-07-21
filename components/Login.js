import React, { useState } from 'react'
import { Button, FormGroup, FormControl } from 'react-bootstrap'
import styles from '../styles/Login.module.scss'

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    props.onSuccess(email, password)
  }

  return (
    <div className={`${styles.wrapper} fadeInDown`}>
      <div className={styles.login}>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" size="lg">
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" size="lg">
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