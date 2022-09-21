import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
import { types } from "../../types/types";


describe('Pruebas en action-ui', () => {
  
  test('Todas las acciones deben funcionar', () => {
    
    const action = setError('Hubo un error');

    expect( action ).toEqual({
      type: types.uiSetError,
      payload: 'Hubo un error'
    })

    const removeErrorAction = removeError();
    const startLoadingAction = startLoading();
    const finishLoadingAction = finishLoading();

    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError
    })
    expect(startLoadingAction).toEqual({
      type: types.uiStartLoading
    })
    expect(finishLoadingAction).toEqual({
      type: types.uiFinishLoading
    })
  });

});
