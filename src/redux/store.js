import { createStore } from 'redux'
//import notesReducer from './notesApp'

import rootReducer from './notesApp'

const store = createStore(rootReducer)

export default store