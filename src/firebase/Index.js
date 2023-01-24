import { createContext } from 'react'
import FirebaseApp  from 'firebase/compat/app';

import 'firebase/compat/firestore';

import { firebaseConfig } from './Config'

class Firebase {
  constructor() {
    if (!FirebaseApp.apps.length) {
      console.log("initilasing")
      FirebaseApp.initializeApp(firebaseConfig)
      FirebaseApp.firestore()
        .enablePersistence({ synchronizeTabs: true })
        .catch(err => console.log(err))
    }

    // instance variables
 
  }
}


const FirebaseContext = createContext(null)

export { Firebase, FirebaseContext, FirebaseApp  }