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
      console.log(code)
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

  const requestPasswordReset = ({ email }) => {
    sendPasswordResetEmail(email)
  }

  const submitPasswordResetCode = ({ resetCode }) => {
    verifyPasswordResetCode(resetCode)
  }

  const updatePassword = ({ password }) => {

  }

  return (
    <div className="App">
      <div className="row">
        <img src={background} className="col-8 border img-fluid bg-purple" style={{
          backgroundImage: 'linear-gradient(to right bottom, #8e00ff, #00ffdb)'
        }} />

        <div class="col-4 p-4 text-black">
          {showForgetPasswordForm ? <PasswordResetForm
            ref={forgetPasswordFormRef}
            onEmailSubmit={requestPasswordReset}
            onResetCodeSubmit={submitPasswordResetCode}
            onNewPasswordUpdate={updatePassword}
          /> :
            <InputForm ref={inputFormRef} onSignIn={onSignIn} onRegister={onRegister} />}
        </div>
      </div>
    </div>
  );
}

export default Auth;
