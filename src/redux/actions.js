import {CHANGE_THEME, DECREMENT, INCREMENT, ASYNC_INCREMENT, DISABLE_BUTTON} from "./types";

export function increment() {
    return {
        type: INCREMENT
    }
}

export function decrement() {
    return {
        type: DECREMENT
    }
}

export function changeTheme(newTheme) {
    return {
        type: CHANGE_THEME,
        payload: newTheme
    }
}

export function disableButtons(isDisable=false) {
    return {
        type: DISABLE_BUTTON,
        payload: isDisable
    }
}

export function asyncIncrement() {
    return function(dispatch) {
        console.log(dispatch)
        setTimeout(() => {
            dispatch({type: ASYNC_INCREMENT})
            dispatch({type: DISABLE_BUTTON, payload: false})
        }, 1500)
    }
}