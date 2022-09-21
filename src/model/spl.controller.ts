import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Store constructor
 */

const NAME = 'spls'
const initialState: string[] = []

/**
 * Actions
 */

export const initSPLs = createAsyncThunk(
  `${NAME}/initSPLs`,
  async (bulk: string[]) => {
    return bulk
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
    void builder.addCase(initSPLs.fulfilled, (state, { payload }) => payload),
})

export default slice.reducer
