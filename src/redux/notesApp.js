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

// Action Creators
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

// User Action Creators
export function registerUser(dataToSubmit){
  const request = axios.post('https://mapmory.herokuapp.com/api/users/register',dataToSubmit)
      .then(response => response.data);
  
  return {
      type: REGISTER_USER,
      payload: request
  }
}

export function loginUser(dataToSubmit){
  const request = axios.post('https://mapmory.herokuapp.com/api/users/login',dataToSubmit)
              .then(response => response.data);

  // const request = axios.post(`http://${api}/api/users/login`, dataToSubmit)
  //   .then(response => response.data);

  return {
      type: LOGIN_USER,
      payload: request
  }
}

export function auth(){
  const request = axios.get('https://mapmory.herokuapp.com/api/users/auth')
  .then(response => response.data);
  // const request = axios.get(`http://${api}/api/users/auth`)
  // .then(response => response.data);

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
          return { ...state, loginSucces: action.payload }
      case AUTH_USER:
          return {...state, userData: action.payload }
      case LOGOUT_USER:
          return {...state}
      default:
          return state;
  }
}


export default combineReducers({
  notesReducer,
  userReducer
});

//export default rootReducer;