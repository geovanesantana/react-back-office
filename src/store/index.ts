import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import darkModeReducer from './darkModeSlice'

const store = configureStore({
  reducer: {
    users: usersReducer,
    darkMode: darkModeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
