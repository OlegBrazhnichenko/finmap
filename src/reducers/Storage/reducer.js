import {REHYDRATE} from 'redux-persist/lib/constants'

const initialState = {};

export default function Storage(state = initialState, action){
  switch (action.type) {

    case REHYDRATE:
      return {
        ...state,
        ...(action.payload ? action.payload.Storage: {})
      };

    default: return {...state};
  }
}
