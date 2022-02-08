import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Pruebas en authReducer", () => {
  test("should retornar el estado por defecto", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test('should colocar autenticar y colocar el "name" del usuario', () => {
    const action = {
      type: types.login,
      payload: { name: "Carlos" },
    };

    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({ logged: true, name: "Carlos" });
  });

  test('should borrar el name del usuario y logged en false', () => {
    const action = {
      type: types.logout,
    }

    const state = authReducer({ logged: true, name: "Carlos"}, action);
    expect(state).toEqual({logged: false});
  })
  
});
