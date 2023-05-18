/// <reference types="cypress" />

import '@testing-library/cypress/add-commands'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

import { attachCustomCommands } from 'cypress-firebase'

const firebaseConfig = {
  apiKey: Cypress.env('CYPRESS_API_KEY'),
  authDomain: Cypress.env('CYPRESS_AUTH_DOMAIN'),
  projectId: Cypress.env('CYPRESS_PROJECT_ID'),
  storageBucket: Cypress.env('CYPRESS_STORAGE_BUCKET'),
  messagingSenderId: Cypress.env('CYPRESS_MESSAGING_SENDER_ID'),
  appId: Cypress.env('CYPRESS_APP_ID'),
}

firebase.initializeApp(firebaseConfig)

attachCustomCommands({ Cypress, cy, firebase })
