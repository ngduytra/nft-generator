import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HOME_TAB } from 'constant'

/**
 * Interface & Utility
 */

export type State = {
  homeTab: string
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: State = {
  homeTab: HOME_TAB.NFT,
}

/**
 * Actions
 */

export const setHomeTab = createAsyncThunk(
  `${NAME}/setHomeTab`,
  async (homeTab: string) => {
    return { homeTab }
  },
)

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      setHomeTab.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
