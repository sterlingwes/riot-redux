/* globals riot, Reducer, ReduxMixin, Redux */

var RootReducer = Redux.combineReducers({
  todo: Reducer.fn
})

var Store = ReduxMixin(Redux.createStore(RootReducer /*, initialState */))

Reducer.init(Store)

riot.mount('todo')
