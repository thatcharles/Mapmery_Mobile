// import the dependency
// import remove from 'lodash.remove'
import axios from 'axios';

// Action Types
export const ADD_NOTE = 'ADD_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'
// User Types
export const LOGIN_USER = 'login_user';
export const REGISTER_USER = 'register_user';
export const AUTH_USER = 'auth_user';
export const LOGOUT_USER = 'logout_user';
export const UPDATE_USER = 'update_user';
// Post Types
export const CREATE_POST = 'create_post'
export const CREATE_PLACE = 'create_place'
export const GET_POSTS = 'get_posts'
export const GET_PLACES_BY_POST = 'get_places_by_post'
export const GET_PLACES = 'get_places'

/**
 * For local development
 * Use LAN to connect device
 */
import Constants from "expo-constants";
const { manifest } = Constants;

const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:5000`)
  : `api.example.com`;
/***********************/

/*********** Action Creators ************/
let noteID = 0

export function addnote(note) {
  return {
    type: ADD_NOTE,
    id: noteID++,
    note
  }
}

export function deletenote(id) {
  return {
    type: DELETE_NOTE,
    payload: id
  }
}

/*********** User Action Creators ************/

export function registerUser(dataToSubmit){
  const request = axios.post('https://mapmory.herokuapp.com/api/users/register',dataToSubmit)
      .then(response => response.data);
  
  return {
      type: REGISTER_USER,
      payload: request
  }
}

export function loginUser(dataToSubmit){
  // const request = axios.post('https://mapmory.herokuapp.com/api/users/login',dataToSubmit)
  //             .then(response => response.data);

  const request = axios.post(`http://${api}/api/users/login`, dataToSubmit)
    .then(response => response.data);

  return {
      type: LOGIN_USER,
      payload: request
  }
}

export function auth(){
  // const request = axios.get('https://mapmory.herokuapp.com/api/users/auth')
  // .then(response => response.data);
  const request = axios.get(`http://${api}/api/users/auth`)
  .then(response => response.data);

  return {
      type: AUTH_USER,
      payload: request
  }
}

export function logoutUser(){
  const request = axios.get('https://mapmory.herokuapp.com/api/users/logout')
  .then(response => response.data);

  return {
      type: LOGOUT_USER,
      payload: request
  }
}

export async function updateUser(dataToSubmit){
  // const request = await axios.post('https://mapmory.herokuapp.com/api/users/update', dataToSubmit)
  //   .then(response => response.data);
  const request = await axios.post(`http://${api}/api/users/update`, dataToSubmit)
      .then(response => response.data);

  
  return {
      type: UPDATE_USER,
      payload: request
  }
}

/*********** Post Action Creators ************/

export function createPost(dataToSubmit){
  // const request = axios.post('https://mapmory.herokuapp.com/api/post/createPost',dataToSubmit)
  //     .then(response => response.data);
  const request = axios.post(`http://${api}/api/post/createPost`, dataToSubmit)
  .then(response => response.data);
  
  return {
      type: CREATE_POST,
      payload: request
  }
}

export function getPosts(){
  // const request = axios.get('https://mapmory.herokuapp.com/api/post/getPosts')
  // .then(response => response.data);
  const request = axios.get(`http://${api}/api/post/getPosts`)
    .then(response => response.data)

  return {
      type: GET_POSTS,
      payload: request
  }

}

export function createPlace(dataToSubmit){
  // const request = axios.post('https://mapmory.herokuapp.com/api/place/createPlace',dataToSubmit)
  //     .then(response => response.data);
  const request = axios.post(`http://${api}/api/place/createPlace`, dataToSubmit)
  .then(response => response.data);
  
  return {
      type: CREATE_PLACE,
      payload: request
  }
} 

export function getPlacesByPost(dataToSubmit){
  // const request = axios.post('https://mapmory.herokuapp.com/api/place/getPlacesByPost',dataToSubmit)
  //     .then(response => response.data);
  const request = axios.post(`http://${api}/api/place/getPlacesByPost`, dataToSubmit)
  .then(response => response.data);
  
  return {
      type: GET_PLACES_BY_POST,
      payload: request
  }
}

export function getPlaces(dataToSubmit){
  // const request = axios.post('https://mapmory.herokuapp.com/api/place/getPlaces',dataToSubmit)
  //     .then(response => response.data);
  const request = axios.get(`http://${api}/api/place/getPlaces`)
  .then(response => response.data);
  
  return {
      type: GET_PLACES,
      payload: request
  }
}

// reducer
import { combineReducers } from 'redux';
const initialState = []

const notesReducer = ( state = initialState, action ) => 
{
  switch (action.type) {
    case ADD_NOTE:
      return [
        ...state,
        {
          id: action.id,
          note: action.note
        }
      ]

    default:
      return state
  }
}

//export default notesReducer
const userReducer = ( state = {}, action ) => 
{
  switch(action.type){
      case REGISTER_USER:
          // console.log('REGISTER_USER: register:', action.payload)
          return {...state, register: action.payload }
      case LOGIN_USER:
          return { ...state, loginSucces: action.payload, userData: {} }
      case AUTH_USER:
          return {...state, userData: action.payload }
      case LOGOUT_USER:
          return {...state}
      case UPDATE_USER:
        return {...state, userData: action.payload}
      default:
          return state;
  }
}

const postReducer = ( state = {}, action ) => 
{
  switch(action.type){
      case CREATE_POST:
          return {...state, postInfo: action.payload }
      case CREATE_PLACE:
        return {...state, placeInfo: action.payload }
      case GET_POSTS:
        return {...state, postsList: action.payload }
      case GET_PLACES_BY_POST:
        return {...state, placesList: action.payload } 
      case GET_PLACES:
        return {...state, places: action.payload} 
      default:
          return state;
  }
}


export default combineReducers({
  notesReducer,
  userReducer,
  postReducer
});

//export default rootReducer;