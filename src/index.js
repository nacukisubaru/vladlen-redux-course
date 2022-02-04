import './styles.css'
//import {createStore} from './createStore'
import {createStore} from 'redux'
import {rootReducer} from './redux/rootReducer'
import { increment, decrement } from './redux/actions'


const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

//инициализируем store с начальным state = 0
const store = createStore(rootReducer, 0)

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
  setTimeout(() => {
    store.dispatch(increment())
  }, 200)
})

//в subscribe можем задать любую логику которая будет отрабатывать 
//вместе с текущим state например выводить в html
store.subscribe(() => {
    const state = store.getState()
    counter.textContent = state
})

//применяем callback чтобы в счетчике вывело 0 на старте приложения
store.dispatch({type: 'INIT_APPLICATION'})


themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark')
})