import { setAgeFromTo } from '../types';

export const initialState = {
  ageTo: {
    years: 0,
  },
  ageFrom: {
    years: 0,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case setAgeFromTo:
      return {
        ...state,
        ageFrom: action.age.from,
        ageTo: action.age.to,
      };
    default:
      return {
        ...state,
      };
  }
}
