import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: []
}

const movies = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies(state, { payload }) {
      state.list = [...state.list, payload]
    },
    resetMovies( state, {payload}) {
      state.list = payload
    },
    editMovies(state, { payload }) {
      state.list = [...state.list.map(item => item.id === payload.id ? payload : item  )]
      console.log(state.list);
    },
    removeMovies(state, { payload }) {
      state.list = [...state.list.filter(item => item.id !== payload.id)]
    },
  }
});

// Actions
export const {
addMovies,
resetMovies,
editMovies,
removeMovies,
} = movies.actions;


// Redux Thunk
export const retrieveMovies = () => async dispatch => {
  try {
    import('../../movies').then(({ movies$ }) => movies$).then( data => {
      dispatch(addMovies(data))
    })
  } catch (e) {
    console.error(e);
  }
}

// Selector
export const getMovies = (state) => state.movies.list;

export default movies.reducer;