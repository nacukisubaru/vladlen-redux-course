import './styles.css'
//import {createStore} from './createStore'
import {applyMiddleware, createStore} from 'redux'
import {logger} from 'redux-logger'
import {rootReducer} from './redux/rootReducer'
import {increment, decrement, asyncIncrement, changeTheme, disableButtons} from './redux/actions'
import thunk from 'redux-thunk'


const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

// function logger(state) {
//     return function(next) {
//         return function(action) {
//             console.log('Prev state', state.getState())
//             console.log('State', state)
//             console.log('Action', action)
//             const newState = next(action)
//             console.log('New state', newState)
//             return newState    
//         }
//     }
// }

//инициализируем store с начальным state = 0
const store = createStore(
    rootReducer, 
    applyMiddleware(thunk, logger)
)

window.store = store

addBtn.addEventListener('click', () => {
    //при каждом dispatch будет вызываться callback который добавили
    //в subscribe
    store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(disableButtons(true))
    store.dispatch(asyncIncrement())
})

//в subscribe можем задать любую логику которая будет отрабатывать 
//вместе с текущим state например выводить в html
store.subscribe(() => {
    const state = store.getState()
    counter.textContent = state.counter
    document.body.className = state.theme.value;
    [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
        btn.disabled = state.theme.disabled
    })    
})

//применяем callback чтобы в счетчике вывело 0 на старте приложения
store.dispatch({type: 'INIT_APPLICATION'})


themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light') ? 'dark': 'light'
    store.dispatch(changeTheme(newTheme))
})