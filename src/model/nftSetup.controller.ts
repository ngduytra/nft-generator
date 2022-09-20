import { MetaplexFile } from '@metaplex-foundation/js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type CollectionInfo = {
  name?: string
  family?: string
  [key: string]: unknown
}

export type Attributes = Array<{
  trait_type?: string
  value?: string
  [key: string]: unknown
}>

export type Files = Array<{
  type?: string
  uri?: string
  [key: string]: unknown
}>

export type Creator = Array<{
  address: string
  share: number
  [key: string]: unknown
}>

export type NftSetupState = {
  currentStep: number
  name: string
  sellerFeeBasisPoints: number
  image?: MetaplexFile
  collectionInfo: CollectionInfo
  isCollection: boolean
  symbol: string
  externalUrl: string
  description: string
  attributes: Attributes
  creators: Creator
  files: Files
  displayedImage: string | ArrayBuffer | null
  hasImageLink: boolean
  imageLink: string
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: NftSetupState = {
  name: '',
  sellerFeeBasisPoints: 0,
  collectionInfo: {},
  isCollection: false,
  currentStep: 0,
  symbol: '',
  externalUrl: '',
  description: '',
  attributes: [],
  creators: [],
  files: [],
  displayedImage: '',
  hasImageLink: false,
  imageLink: '',
}

/**
 * Actions
 */
export const setCurrentStep = createAsyncThunk(
  `${NAME}/setCurrentStep`,
  async (currentStep: number) => {
    return { currentStep }
  },
)

export const setName = createAsyncThunk(
  `${NAME}/setName`,
  async (name: string) => {
    return { name }
  },
)

export const setSellerFeeBasisPoints = createAsyncThunk(
  `${NAME}/setSellerFeeBasisPoints`,
  async (sellerFeeBasisPoints: number) => {
    return { sellerFeeBasisPoints }
  },
)

export const setImage = createAsyncThunk(
  `${NAME}/setImage`,
  async (image: MetaplexFile | string) => {
    return { image }
  },
)

export const setCollectionInfo = createAsyncThunk(
  `${NAME}/setCollectionInfo`,
  async (collectionInfo: CollectionInfo) => {
    return { collectionInfo }
  },
)

export const setIsCollection = createAsyncThunk(
  `${NAME}/setIsCollection`,
  async (isCollection: boolean) => {
    return { isCollection }
  },
)

export const setSymbol = createAsyncThunk(
  `${NAME}/setSymbol`,
  async (symbol: string) => {
    return { symbol }
  },
)

export const setExternalUrl = createAsyncThunk(
  `${NAME}/setExternalUrl`,
  async (externalUrl: string) => {
    return { externalUrl }
  },
)

export const setDescription = createAsyncThunk(
  `${NAME}/setDescription`,
  async (description: string) => {
    return { description }
  },
)

export const setAttributes = createAsyncThunk(
  `${NAME}/setAttributes`,
  async (attributes: Attributes) => {
    return { attributes }
  },
)

export const setCreators = createAsyncThunk(
  `${NAME}/setCreators`,
  async (creators: Creator) => {
    return { creators }
  },
)

export const setFiles = createAsyncThunk(
  `${NAME}/setFiles`,
  async (files: Files) => {
    return { files }
  },
)

export const setDisplayedImage = createAsyncThunk(
  `${NAME}/setDisplayedImage`,
  async (displayedImage: string | ArrayBuffer | null) => {
    return { displayedImage }
  },
)

export const setHasImageLink = createAsyncThunk(
  `${NAME}/setHasImageLink`,
  async (hasImageLink: boolean) => {
    return { hasImageLink }
  },
)

export const setImageLink = createAsyncThunk(
  `${NAME}/setImageLink`,
  async (imageLink: string) => {
    return { imageLink }
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
    void builder
      .addCase(
        setName.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setSellerFeeBasisPoints.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setImage.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setCollectionInfo.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setIsCollection.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setCurrentStep.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setSymbol.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setExternalUrl.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setDescription.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setAttributes.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setCreators.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setFiles.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setDisplayedImage.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setHasImageLink.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setImageLink.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
