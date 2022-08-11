import { useState } from 'react'
import { auth } from '../../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { login } from '../../features/userSlice'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [showRegister, setShowRegister] = useState(false)

  const dispatch = useDispatch()

  const register = () => {
    setShowRegister(true)

    if (name.length === 0) return

    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: name,
          photoURL: profilePic,
        })
          .then(
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoURL: profilePic,
              })
            )
          )
          .catch((error) => alert(error.message))
      })
      .catch((error) => alert(error.message))
  }

  const signin = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: name,
            photoURL: userAuth.user.photoURL,
          })
        )
      })
      .catch((error) => alert(error.message))
  }

  return (
    <div className="login_wrapper">
      <div className="login">
        <img src="/images/login_logo.png" alt="login-logo" className="login_logo" />

        <form>
          {showRegister ? (
            <>
              <input
                type="text"
                placeholder="Full name (required if registering)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Profile picture URL (optional)"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
              />
            </>
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="Email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={signin}>
            Sign In
          </button>
        </form>

        <p className="register">
          Not a member?{' '}
          <span className="login_register" onClick={register}>
            Register Now
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
