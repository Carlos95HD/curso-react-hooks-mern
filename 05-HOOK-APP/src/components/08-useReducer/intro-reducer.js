//Estado Inicial
const initialState = [{
  id: 1,
  todo:'Comprar pan',
  done: false
}];

//Definimos el reducer
const todoReducer = ( state = initialState, action ) => {

  if (action?.type === 'agregar') {
    return [ ...state, action.payload ]
  }

  return state;
}

//Inicializacion
let todos = todoReducer()

//Acción
const newTodo = {
  id:2,
  todo:'Comprar Leche',
  done: false
}

const agregarTodoAction = {
  type:'agregar',
  payload: newTodo
}

todos = todoReducer( todos, agregarTodoAction )

console.log(todos)