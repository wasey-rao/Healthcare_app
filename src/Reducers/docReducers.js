import { ACTION_TYPES } from "./docActionTypes";

export const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  errorMessage: null,
};

export const docReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_TAG":
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };
    case "REMOVE_TAG":
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload),
      };
    case "INCREASE":
      return {
        ...state,
        quantity: state.quantity + 1,
      };
    case "DECREASE":
      return { ...state, quantity: state.quantity - 1 };
    default:
      return state;
  }
};