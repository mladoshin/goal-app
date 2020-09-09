import {combineReducers} from 'redux'
import {userReducer} from './userReducer'
import {themeReducer} from './themeReducer'
import {goalsReducer} from './goalsReducer'
import { categoryReducer } from './categoryReducer'
export const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  goals: goalsReducer,
  goalCategories: categoryReducer
})