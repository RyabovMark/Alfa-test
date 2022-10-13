import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

const headers = {
  'X-RapidAPI-Key': '2b1f33dc05msh6539d0f2226b93ep12f1a9jsn4b9853f7dae4',
  'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
}

const filmsUrl = 'https://ott-details.p.rapidapi.com/advancedsearch'

export const fetchFilmByCategory = createAsyncThunk(
  'filmSlice/fetchFilmByCategory',
  async ({genre}) => {
    if (genre === initialState.genre) {
      return
    }
    const response = await axios({
      method: 'GET',
      url: filmsUrl,
      params: {
        language: 'english',
        start_year: '2000',
        end_year: '2010',
        max_imdb: '10',
        min_imdb: '8',
        sort: 'latest',
        type: 'movie',
        page: '1',
        genre,
      },
      headers
    })
    return response.data.results.map(item => Object.assign(item, {isLiked: false}))
  }
)

const initialState = {
  filmsList: [],
  status: 'idle',
  error: null,
  genre: null
}

export const filmSlice = createSlice({
  name: 'filmSlice',
  initialState,
  reducers: {
    setLikedPublications: (state, action) => {
      const findItem = state.filmsList.find(item => item.imdbid === action.payload)
      findItem.isLiked = true
    },
    removeFromLikedPublications: (state, action) => {
      const findItem = state.filmsList.find(item => item.imdbid === action.payload)
      findItem.isLiked = false
    },
    removeFromFilmList: (state, action) => {
      state.filmsList = state.filmsList.filter(item => item.imdbid !== action.payload)
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchFilmByCategory.pending, (state) => {
      state.status = 'pending'
      state.error = null
    })
    builder.addCase(fetchFilmByCategory.fulfilled, (state, action) => {
      const {genre} = action.meta.arg
      state.status = 'succeeded'
      state.filmsList = (action.payload)
      state.genre = genre
    })
    builder.addCase(fetchFilmByCategory.rejected, (state, action) => {
      if (!action.payload)
        state.status = 'failed'
      state.error = action.error.message
    })
  }
})

export const filmActions = filmSlice.actions
export const filmReducer = filmSlice.reducer


//PS ссылка на страницу публичного API
// https://rapidapi.com/gox-ai-gox-ai-default/api/ott-details