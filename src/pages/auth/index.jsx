import logo from './logo.svg';
import './App.css';
import background from './login-background.jpg'
import { useMemo, useRef, useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, updateCurrentUser, sendPasswordResetEmail, verifyPasswordResetCode } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import InputForm from './components/InputForm';
import PasswordResetForm from './components/PasswordResetForm';

const auth = getAuth()
function Auth() {
  const navigate = useNavigate()

  const inputFormRef = useRef()
  const forgetPasswordFormRef = useRef()
  const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(false)

  const onSignIn = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password).then((credentials) => {
      navigate('/home')
    }).catch(({ code }) => {
      if (code == 'auth/invalid-login-credentials')
        inputFormRef.current.showMessage('authenticated failed. Try again!')
    })
  }

  const onRegister = ({ username, email, password, confirmPassword }) => {
    createUserWithEmailAndPassword(auth, email, password).then((credentials) => {
      credentials.user.displayName = username
      updateCurrentUser(auth, credentials.user)
      navigate('/home')
    }).catch(({ code }) => {
      console.log(code)
    })
  }

  const requestPasswordReset = () => {
    setShowForgetPasswordForm(true)
  }

  const onSubmitForgetPasswordEmail = ({ email }) => {
    sendPasswordResetEmail(auth, email).then(() => {
      forgetPasswordFormRef.current.onEmailSent('Email has sent!. Check your inbox')
    })
  }

  const submitPasswordResetCode = ({ resetCode }) => {
    verifyPasswordResetCode(auth, resetCode).then((recievedEmail) => {
      if (recievedEmail != auth.currentUser.email) {
        forgetPasswordFormRef.current.showError('Code is invalid. Try again')
      }
    })
  }

  const onUpdateNewPassowrd = ({ password }) => {
    console.log()
  }

  return (
    <div className='background-cover d-flex' style={{ height: '100vh' }}>
      <div class="card shadow mx-auto align-self-center row" style={{ width: '40%' }}>
        <div className='card-body'>
          {showForgetPasswordForm ? <PasswordResetForm
            ref={forgetPasswordFormRef}
            goBack={() => setShowForgetPasswordForm(false)}
            onEmailSubmit={onSubmitForgetPasswordEmail}
            onResetCodeSubmit={submitPasswordResetCode}
            onNewPasswordUpdate={onUpdateNewPassowrd}
          /> :
            <InputForm ref={inputFormRef}
              onRequestPasswordReset={requestPasswordReset}
              onSignIn={onSignIn} onRegister={onRegister} />}
        </div>
      </div>
    </div>

  );
}

export default Auth;
