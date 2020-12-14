import produce from 'immer';
import { LOAD_USER, LOGIN, LOGOUT, UPDATE_ACCESS_TOKEN } from './actions';

const initialState = {
  user: null,
  tokens: {
    refresh: localStorage.getItem('joaquimnet.authToken'),
    access: null,
  },
};

export const userReducer = produce((draft, action) => {
  switch (action.type) {
    case LOAD_USER:
      draft.user = action.payload;
      break;
    case UPDATE_ACCESS_TOKEN:
      draft.tokens.access = action.payload;
      break;
    case LOGIN:
      draft.user = action.payload.user;
      draft.tokens = action.payload.tokens;
      localStorage.setItem(
        'joaquimnet.authToken',
        action.payload.tokens.refresh,
      );
      break;
    case LOGOUT:
      draft.user = null;
      draft.tokens = { refresh: null, access: null };
      localStorage.removeItem('joaquimnet.authToken');
      break;
  }
}, initialState);
