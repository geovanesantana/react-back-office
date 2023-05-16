import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { User, UsersState } from '../types'

const initialState: UsersState = {
  data: [],
  total: 0,
  loading: false,
  error: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersSuccess: (
      state,
      action: PayloadAction<{ data: User[]; total: number }>
    ) => {
      state.loading = false
      state.error = null
      state.data = action.payload.data
      state.total = action.payload.total
    },
    getUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false
      state.error = null
      state.data = state.data.map((user) =>
        user.id === action.payload.id ? action.payload : user
      )
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    deleteUserSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false
      state.error = null
      state.data = state.data.filter((user) => user.id !== action.payload)
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    addUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false
      state.error = null
      state.data = [action.payload, ...state.data]
    },
    addUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number, { dispatch }) => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      )
      const { data, total } = response.data
      dispatch(getUsersSuccess({ data, total }))
    } catch (error: any) {
      dispatch(getUsersFailure(error.message))
    }
  }
)

export const updateUserData = createAsyncThunk(
  'users/updateUserData',
  async (user: User, { dispatch }) => {
    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${user.id}`,
        user
      )
      dispatch(updateUserSuccess(response.data))
    } catch (error: any) {
      dispatch(updateUserFailure(error.message))
    }
  }
)

export const addUser = createAsyncThunk(
  'users/addUser',
  async (user: User, { dispatch }) => {
    try {
      const response = await axios.post('https://reqres.in/api/users', user)
      dispatch(addUserSuccess(response.data))

      console.log('response.data', response.data)
    } catch (error: any) {
      dispatch(addUserFailure(error.message))
    }
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (user: User, { dispatch }) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${user.id}`)
      dispatch(deleteUserSuccess(user.id))
    } catch (error: any) {
      dispatch(deleteUserFailure(error.message))
    }
  }
)

export const {
  getUsersSuccess,
  getUsersFailure,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  addUserSuccess,
  addUserFailure,
} = usersSlice.actions

export default usersSlice.reducer
