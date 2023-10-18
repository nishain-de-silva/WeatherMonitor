import logo from './logo.svg';
import './App.css';
import background from './login-background.jpg'
import { useMemo, useState } from 'react';
import Network from '../../Network';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, updateCurrentUser } from 'firebase/auth'
import { checkForExistence, getEmailErrorMessage, isPasswordsMatch } from '../../services/validationService';
import { useNavigate } from 'react-router-dom';

const auth = getAuth()
function Auth() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [alertMessage, setAlertMessage] = useState('')

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onChange = (setCallback) => {
    return (event) => {
      setCallback(event.target.value)
    }
  }

  const showAlert = (message) => {
    setAlertMessage(message)
    setTimeout(() => {
      setAlertMessage('')
    }, 3500)
  }

  const emailErrorMessage = useMemo(() => getEmailErrorMessage(email), [email])

  const signInOrSignUp = async () => {
    if (isLogin) {
      const errorMessage = checkForExistence({ email, password }) || emailErrorMessage
      if (errorMessage) {
        setAlertMessage(errorMessage)
        return
      }
      signInWithEmailAndPassword(auth, email, password).then((credentials) => {
        navigate('/home')
      }).catch(({ code }) => {
        console.log(code)
      })
    } else {

      const errorMessage = checkForExistence({ username, email, password })
        || emailErrorMessage
        || isPasswordsMatch(password, confirmPassword)
      if (errorMessage) {
        setAlertMessage(errorMessage)
        return
      }

      createUserWithEmailAndPassword(auth, email, password).then((credentials) => {
        credentials.user.displayName = username
        updateCurrentUser(auth, credentials.user)
        navigate('/home')
      }).catch(({ code }) => {
        console.log(code)
      })
    }
  }

  const swapMode = () => {
    setIsLogin(!isLogin)
    setPassword('')
    setEmail('')
    setConfirmPassword('')
    setUsername('')
  }

  return (
    <div className="App">
      <div className="row">
        <img src={background} className="col-8 border img-fluid bg-purple" style={{
          backgroundImage: 'linear-gradient(to right bottom, #8e00ff, #00ffdb)'
        }} />

        <div class="col-4 p-4 text-black d- flex">
          <div class="d-flex align-items-start mb-3 pb-1">
            <span class="h1 fw-bold mb-0">{isLogin ? "Login" : "Sign Up"}</span>
          </div>
          {!isLogin && <div class="mb-3">
            <input
              class="form-control p-3"
              onChange={onChange(setUsername)}
              placeholder="Username" />
          </div>}
          <div class="mb-3">
            <input
              type="email"
              class="form-control p-3"
              value={email}
              onChange={onChange(setEmail)}
              placeholder="Email address" />
          </div>
          <div class="mb-3">
            <input
              class="form-control p-3"
              value={password}
              type='password'
              onChange={onChange(setPassword)}
              placeholder="Password" />
              {isLogin && <button type="button" class="btn float-left btn-link">Forgot password</button>}

          </div>
          {!isLogin && <div class="mb-3">
            <input
              class="form-control p-3"
              value={confirmPassword}
              type='password'
              onChange={onChange(setConfirmPassword)}
              placeholder="Confirm Password" />
          </div>}
          {!!alertMessage && <div class="alert alert-danger" role="alert">
            {alertMessage}
          </div>}

          <button
            className='btn fw-bold btn-primary'
            onClick={signInOrSignUp}
            style={{ backgroundImage: 'linear-gradient(to right bottom, rgb(0 178 244), rgb(91 151 229))' }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <div className='mt-3'>
            <p>{isLogin ? "Don't have a account ? " : "Already have an accont ? "}<span
              onClick={swapMode} className='link-primary fw-bold'>{isLogin ? "Sign Up" : "Login"}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
