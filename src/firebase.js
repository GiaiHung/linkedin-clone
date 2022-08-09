import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCzdnYtuRAnikpO59RSVRbSC-yUw8MBgN8',
  authDomain: 'linkedin-clone-8d5f4.firebaseapp.com',
  projectId: 'linkedin-clone-8d5f4',
  storageBucket: 'linkedin-clone-8d5f4.appspot.com',
  messagingSenderId: '704752399398',
  appId: '1:704752399398:web:e728371ede30bfa3c1a2e7',
  measurementId: 'G-WJF1399LWN',
}

const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
