import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    clearUserInfo: state => null,
    addUserInfo: (state, action) => action.payload
  }
})

export const { clearUserInfo, addUserInfo } = userSlice.actions

export default userSlice.reducer
