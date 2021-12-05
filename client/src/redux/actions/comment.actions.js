import * as types from "../constants/comment.constants";
import api from "../api";
import { toast } from "react-toastify";


const createComment = (postId, body) => async (dispatch) => {
  dispatch({ type: types.CREATE_COMMENT_REQUEST, payload: null });
  try {
    const res = await api.post(`/posts/${postId}/comments`, {
      body,
    });
    dispatch({
      type: types.CREATE_COMMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_COMMENT_FAILURE, payload: error });
  }
};

const updateComment = (body) => async (dispatch) => {
  dispatch({ type: types.UPDATE_COMMENT_SUCCESS, payload: null });
  try {
    const res = await api.put(`/comments`, { body });
    dispatch({ type: types.UPDATE_COMMENT_SUCCESS, payload: res.data.data })
    toast.success(`Your profile has been updated.`);
  } catch (error) {
    dispatch({ type: types.UPDATE_COMMENT_FAILURE, payload: null });
  }
}

export const commentActions = {
  createComment,
  updateComment
};