import { FindNftsByCreatorOutput } from '@metaplex-foundation/js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Store constructor
 */

const NAME = 'nfts'
const initialState: FindNftsByCreatorOutput = []

/**
 * Actions
 */

export const initNFTs = createAsyncThunk(
  `${NAME}/initNFTs`,
  async (bulk: FindNftsByCreatorOutput) => {
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
    void builder.addCase(initNFTs.fulfilled, (state, { payload }) => payload),
})

export default slice.reducer
