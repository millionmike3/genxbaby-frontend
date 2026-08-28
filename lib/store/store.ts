import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // add your reducers here
  }
})

export type Dispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
