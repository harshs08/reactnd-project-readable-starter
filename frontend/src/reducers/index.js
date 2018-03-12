import { compareValues } from '../utils/helper'
import { combineReducers } from 'redux'

import {
    ADD_POST,
    REMOVE_POST,
    UPDATE_POST,
    LIST_POST,
    LIST_POST_CATEGORY,
    SORT_VOTE_ASC,
    SORT_VOTE_DESC,
    VOTE_UP,
    VOTE_DOWN,
    LIST_COMMENT,
    ADD_COMMENT,
    UPDATE_COMMENT,
    REMOVE_COMMENT,
    LIKE_COMMENT,
    DISLIKE_COMMENT
} from '../actions'

const initialPostState = { post: [] }

const initialCommentState = { comment: [] }

function postList(state = initialPostState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        post: [...state.post, action.post]
      }

    case REMOVE_POST:
      let filtered = removeItem(state.post, action.post.id);
      return {
        ...state,
        post: filtered
      }

    case UPDATE_POST:
      return {
        ...state, post: state.post.map(post =>
          (post.id === action.post.id)
            ? { ...post, body: action.post.body, title: action.post.title }
            : post
        )
      }

    case LIST_POST:
      return {
        ...state,
        post: action.post
      }

    case LIST_POST_CATEGORY:
      return {
        ...state,
        post: action.post
      }

    case SORT_VOTE_ASC:
      let sortedAsc = action.post.sort(compareValues('voteScore'));
      return {
        ...state,
        post: sortedAsc
      }

    case SORT_VOTE_DESC:
      let sortedDesc = action.post.sort(compareValues('voteScore', 'desc'));
      return {
        ...state,
        post: sortedDesc
      }

    case VOTE_UP:
      let posts = state.post.map(post =>
        (post.id === action.post.id)
          ? { ...post, voteScore: action.post.voteScore }
          : post
        )
      return {
        ...state, post: posts
      }

    case VOTE_DOWN:
      return {
        post: state.post.map(post =>
        (post.id === action.post.id)
          ? { ...post, voteScore: action.post.voteScore }
          : post
        )
      }

    default:
      return state;
  }
}

function commentList(state = initialCommentState, action) {
  switch (action.type) {
    case LIST_COMMENT:
      return {
        ...state,
        comment: action.comment
      }
    case ADD_COMMENT:
      return {
        ...state,
        comment: [...state.comment, action.comment]
    }

    case REMOVE_COMMENT:
      return {
      ...state,
      comment: removeItem(state.comment, action.comment.id)
      }

    case UPDATE_COMMENT:
      return {
        ...state, comment: state.comment.map(comment =>
          (comment.id === action.comment.id)
            ? { ...comment, body: action.comment.body, title: action.comment.title }
            : comment
        )
      }

    case LIKE_COMMENT:
      let comments = state.comment.map(comment =>
        (comment.id === action.comment.id)
           ? { ...comment, voteScore: action.comment.voteScore }
            : comment
      )

      return {
        ...state, comment: comments
      }

    case DISLIKE_COMMENT:
      return {
        comment: state.comment.map(comment =>
          (comment.id === action.comment.id)
            ? { ...comment, voteScore: action.comment.voteScore }
            : comment
        )
      }

    default:
      return state
  }
}

function removeItem(array, id) {
  return array.filter((item) => item.id !== id)
}

export default combineReducers({ postList, commentList })