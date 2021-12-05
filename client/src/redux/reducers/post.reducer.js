import * as types from "../constants/post.constants";

const initialState = {
  posts: [],
  loading: false,
  totalPageNum: 1,
  selectedBlog: null,
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.POST_REQUEST_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false
      };

    case types.CREATE_POST_SUCCESS:
    case types.CREATE_POST_FAILURE:
    case types.POST_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default postReducer;
