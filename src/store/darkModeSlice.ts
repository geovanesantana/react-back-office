import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'

interface DarkModeState {
  darkMode: boolean
}

const initialState: DarkModeState = {
  darkMode: localStorage.getItem('darkMode') === 'true',
}

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      const updatedDarkMode = !state.darkMode
      state.darkMode = updatedDarkMode
      localStorage.setItem('darkMode', String(updatedDarkMode))

      // if (state.darkMode) {
      //   document.body.classList.add('dark')
      // } else {
      //   document.body.classList.remove('dark')
      // }
    },
  },
})

export const { toggleDarkMode } = darkModeSlice.actions

export const selectDarkMode = (state: RootState) => state.darkMode.darkMode

export default darkModeSlice.reducer
