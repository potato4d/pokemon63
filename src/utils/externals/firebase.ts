import * as _firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import 'firebase/auth'
import 'firebase/messaging'
import 'firebase/analytics'

const config: any = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

if (process.env.FIREBASE_MEASUREMENT_ID) {
  config.measurementId = process.env.FIREBASE_MEASUREMENT_ID
}

export const app = !_firebase.apps.length
  ? _firebase.initializeApp(config)
  : _firebase.app()

function initialize(app: any) {
  if (process.browser) {
    try {
      return app.analytics()
    } catch (e) {
      console.log(e)
    }
  }
  return {
    logEvent: () => {},
  }
}

export const firebase = _firebase
export const firestore = app.firestore()
export const storage = app.storage()
export const functions = app.functions('asia-northeast1')
export const analytics = initialize(app)
export const auth = app.auth()
