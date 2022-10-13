import {configureStore} from '@reduxjs/toolkit';
import {filmReducer} from "../features/filmSlice";

export const store = configureStore({
  reducer: {
    filmCollection: filmReducer,
  },
});