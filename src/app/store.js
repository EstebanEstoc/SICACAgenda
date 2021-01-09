import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger]
})

export const persistor = persistStore(store)
