import { todoReducer } from "../../../components/08-useReducer/todoReducer";
import { demoTodos } from "../../fixtures/demoTodos";

describe("Pruebas en todoReducer", () => {
  test("should retornar el estado por defecto", () => {
    const state = todoReducer(demoTodos, {});
    expect(state).toEqual(demoTodos);
  });

  test("should agregar un TODO", () => {
    const newTodo = {
        id: 3,
        desc: "Aprender Mongo",
        done: false,
    };

    const action = {
      type: "add",
      payload: newTodo,
    };

    const state = todoReducer(demoTodos, action);
    expect( state.length ).toBe(3)
    expect( state ).toEqual([...demoTodos, newTodo])
  });

  test('should borrar un TODO', () => {
    //Action.payload = ID del todo
    const action = {
      type:'delete',
      payload: 1
    };

    const state = todoReducer(demoTodos, action);
    expect( state.length ).toBe(1)
    expect( state ).toEqual( [demoTodos[1]] ) //state es igual al primer arreglo

  })

  test('should hacer el TOGGLE del TODO', () => {
    //Action.payload = ID del todo
    const action = {
      type:'toggle',
      payload: 1
    };

    const state = todoReducer(demoTodos, action);
    expect( state[0].done ).toEqual( true )
    // expect( state.id === action.payload ).toBe( false )
    expect( state[1] ).toEqual( demoTodos[1] ) // Asegurar que el segundo elemnto no cambió

  })
  
});
