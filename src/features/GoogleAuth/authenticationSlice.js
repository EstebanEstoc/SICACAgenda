import { createSlice } from '@reduxjs/toolkit'

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: false,
  reducers: {
    toggleAuthTrue: state => true,
    toggleAuthFalse: state => false
  }
})

export const { toggleAuthFalse, toggleAuthTrue } = authenticationSlice.actions

export default authenticationSlice.reducer
