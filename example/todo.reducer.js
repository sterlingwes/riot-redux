// simulating async request
function fetchTodo (callback) {
  var todo = {
    title: 'I want to behave!',
    items: [
      { title: 'Avoid excessive caffeine', done: true },
      { title: 'Hidden item', hidden: true },
      { title: 'Be less provocative' },
      { title: 'Be nice to people' }
    ]
  }
  setTimeout(function () {
    callback(todo)
  }, 500)
}

var Reducer = (function () { //eslint-disable-line
  var defaultState = {title: '...loading', items: []}

  function reducerFn (state, action) {
    state = state || defaultState

    var items

    switch (action.type) {
      case 'load_todo':
        return action.todo
      case 'add_item':
        items = state.items.concat([action.item])
        return Object.assign({}, state, {items: items})
      case 'toggle_item_done':
        var index = action.index
        var item = state.items[index]
        item = Object.assign({}, item, {done: !item.done})
        items = state.items.slice(0, index).concat([item], state.items.slice(index + 1))
        return Object.assign({}, state, {items: items})
      default:
        return state
    }
  }

  function init (store) {
    // Action creators

    store.on('fetch-todo', function () {
      fetchTodo(function (todo) {
        store.dispatch({type: 'load_todo', todo: todo})
      })
    })

  }

  return {fn: reducerFn, init: init}
}())
