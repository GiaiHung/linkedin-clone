import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, login, logout } from './features/userSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import './App.css'

import Feed from './components/Feed/Feed'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Widget from './components/Widget/Widget'
import Login from './components/Login/Login'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const getWindowWidth = () => window.innerWidth
  const [width, setWidth] = useState(getWindowWidth())

  useEffect(() => {
    const handleResize = () => {
      setWidth(getWindowWidth())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
          {/* Responsive */}
          {width > 768 && <Sidebar />}
          <Feed />
          {width > 768 && <Widget />}
        </div>
      )}
    </div>
  )
}

export default App
