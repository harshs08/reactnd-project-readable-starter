const baseUrl = 'http://localhost:3001' 
const headers = { 'Authorization': 'random-token', 'Content-Type': 'application/json' }

export function fetchCategories() {
  return fetch(`${baseUrl}/categories`,
  {
    method: 'GET',
    headers: headers
  }).then((res) => res.json())
}


export function fetchPost() {
  return fetch(`${baseUrl}/posts`,
  {
    method: 'GET',
    headers: headers
  }).then((res) => res.json())
}

export function fetchPostByCategory(category) {
  return fetch(`${baseUrl}/${category}/posts`,
  {
    method: 'GET',
    headers: headers
  }).then((res) => res.json())
}

export function newPost(payload) {
  return fetch(`${baseUrl}`,
  {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  }).then((res) => res.json())
}

export function updatePostById(id, payload) {
  return fetch(`${baseUrl}/posts/${id}`,
  {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(payload)
  }).then((res) => res.json())
}

export function deletePostById(id) {
  return fetch(`${baseUrl}/posts/${id}`,
  {
    method: 'DELETE',
    headers: headers
  }).then((res) => res.json());
}

export function fetchPostById(id) {
  return fetch(`${baseUrl}/posts/${id}`,
  {
    method: 'GET',
    headers: headers
  }).then((res) => res.json())
}

export function vote(id, voteType) {
  return fetch(`${baseUrl}/posts/${id}`,
  {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option: voteType })
  }).then((res) => res.json())
}

export function fetchComments(postId) {
  return fetch(`${baseUrl}/posts/${postId}/comments`,
  {
    method: 'GET',
    headers: headers
  }).then((res) => res.json())
}

export function newComment(payload) {
  return fetch(`${baseUrl}/comments`,
  {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  }).then((res) => res.json())
}

export function editComment(id, payload) {
  return fetch(`${baseUrl}/comments/${id}`,
  {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(payload)
  }).then((res) => res.json())
}

export function deleteComment(id) {
  return fetch(`${baseUrl}/comments/${id}`,
  {
    method: 'DELETE',
    headers: headers
  }).then((res) => res.json())
}

export function voteComment(id, voteType) {
  return fetch(`${baseUrl}/comments/${id}`,
  {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option: voteType })
  }).then((res) => res.json())
}