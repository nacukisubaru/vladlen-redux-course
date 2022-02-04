import { DECREMENT, INCREMENT } from "./types"

//в reducer описываем правила на каком действии должен меняться state
export function rootReducer(state, action) {
    if(action.type == 'INCREMENT') {
        return state + 1
    } else if(action.type == DECREMENT) {
        return state - 1
    }

    return state
}