export function createStore(rootReducer, initialState) {
    //задаем начальное состояние чере reducer
    let state = rootReducer(initialState, {type: '__INIT__'})
    let subscribers = []

    return {
        // dispatch принимает правила для изменения state так как вызываем reducer
        // action === {type: 'INCREMENT'}
        dispatch(action) {
           state = rootReducer(state, action)
           //применяем callback функцию
           subscribers.forEach(sub=> sub())
        },
        //подписывает добавляет callback функцию для применения 
        subscribe(callback) {
            subscribers.push(callback)
        },
        getState() {
            return state
        }
    }
}