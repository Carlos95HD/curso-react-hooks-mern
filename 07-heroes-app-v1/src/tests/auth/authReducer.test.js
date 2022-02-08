import { types } from "../../type/types";
import { authReducer } from "../../auth/authReducer";

describe('Pruebas en authReducer', () => {

  test('Debe retornar el estado por defecto', () => {
    // const state = {};

    // const action = {
    //   type:{
    //     login:'none'
    //   },
    //   payload:{
    //     name:"Carlos",
    //   }
    // };

    // const reducer = authReducer(state, action);

    const state = authReducer({logged:false}, {})
    expect(state).toEqual({logged:false})
  })

  test('debe autenticar y colocar el name del usuario', () => {

    // const state = {
    //   name:"Carlos",
    //   logged: true
    // };
  
    const action = {
      type:types.login,
      payload:{
        name:"Carlos",
      }
    };

    const reducer = authReducer({logged:false}, action);
    expect(reducer).toEqual({
      logged:true,
      name:'Carlos'
    })
  });

  test('debe borrar el name del usuario y logged en false', () => {
    
    // const state = {
    //   name:"Carlos",
    // };
  
    const action = {
      type:types.logout
    };

    const reducer = authReducer({logged:true, name:'Carlos'}, action);
    expect(reducer).toEqual({
      logged:false });
  })

})
