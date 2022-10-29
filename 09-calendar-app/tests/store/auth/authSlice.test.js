import { authSlice } from "../../../src/store/auth/authSlice";
import { initialState } from "../../fixtures/authState";

describe("Pruebas en authSlice", () => {
  test("debe regresar el estado inicial", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });
});
