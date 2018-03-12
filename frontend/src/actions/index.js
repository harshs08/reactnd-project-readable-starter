export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const LIST_POST = 'LIST_POST'
export const LIST_POST_CATEGORY = 'LIST_POST_CATEGORY'

export const SORT_VOTE_ASC = 'SORT_VOTE_ASC'
export const SORT_VOTE_DESC = 'SORT_VOTE_DESC'

export const LIST_COMMENT = 'LIST_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const LIKE_COMMENT = 'LIKE_COMMENT'
export const DISLIKE_COMMENT = 'DISLIKE_COMMENT'

export const VOTE_UP='VOTE_UP'
export const VOTE_DOWN='VOTE_DOWN'

export function addPost(post) {
  return {
    type: ADD_POST,
    post: post
  }
}

export function removePost(post) {
  return {
    type: REMOVE_POST,
    post: post
  }
}


export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post: post
  }
}

export function listPostByCategory(posts) {
  return {
    type: LIST_POST_CATEGORY,
    post: posts
  }
}

export function listPost(posts) {
  return {
    type: LIST_POST,
    post: posts
  }
}

export function sortPostByVoteAsc(posts){
  return {
    type: SORT_VOTE_ASC,
    post: posts
  }
}

export function sortPostByVoteDesc(posts){
  return {
    type: SORT_VOTE_DESC,
    post: posts
  }
}

export function upVote(post){
  return{
    type: VOTE_UP,
    post: post
  }
}

export function downVote(post){
  return{
    type: VOTE_DOWN,
    post:post
  }
}

export function dislikeComment(comment){
  return {
    type: DISLIKE_COMMENT,
    comment: comment
  }
}

export function likeComment(comment){
  return {
    type: LIKE_COMMENT,
    comment: comment
  }
}

export function listComment(comment){
  return {
    type: LIST_COMMENT,
    comment: comment
  }
}

export function addComment(comment){
  return {
    type: ADD_COMMENT,
    comment: comment
  }
}

export function updateComment(comment){
  return {
    type: UPDATE_COMMENT,
    comment: comment
  }
}

export function removeComment(comment){
  return {
    type: REMOVE_COMMENT,
    comment: comment
  }
}
