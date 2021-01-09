import { combineReducers } from '@reduxjs/toolkit'
import authentication from '../features/GoogleAuth/authenticationSlice'
import GoogleUser from '../features/GoogleAuth/GoogleAuthSlices'

export default combineReducers({
  authentication,
  GoogleUser
})
