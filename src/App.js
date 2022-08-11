import React, { useEffect } from 'react'
import './App.css'

import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

import Feed from './components/Feed/Feed'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import Sidebar from './components/Sidebar/Sidebar'
import Widget from './components/Widget/Widget'

import { selectUser, login, logout } from './features/userSlice'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          })
        )
      } else {
        dispatch(logout())
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="app">
      <Header />

      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Feed />
          <Widget />
        </div>
      )}
    </div>
  )
}

export default App
