import {combineReducers} from "redux"
import {DISABLE_BUTTON, CHANGE_THEME, ASYNC_INCREMENT, DECREMENT, INCREMENT } from "./types"

//в reducer описываем правила на каком действии должен меняться state
export function counterReducer(state = 0, action) {
    if(action.type == INCREMENT) {
        return state + 1
    } else if(action.type == DECREMENT) {
        return state - 1
    } else if(action.type === ASYNC_INCREMENT) {
        return state + 1 
    }

    return state
}

const initialThemeState = {
    value: 'light',
    disabled: false
}

export function themeReducer(state = initialThemeState, action) {
    switch(action.type) {
        case CHANGE_THEME:
            return {...state, value: action.payload}
        case DISABLE_BUTTON:
            return {...state, disabled: action.payload}
        default: return state
    }
}

export const rootReducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer,
})

