import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startLogout } from "../../../actions/auth";
import { startNewNote } from '../../../actions/notes';

import { Sidebar } from "../../../components/journal/Sidebar";

jest.mock("../../../actions/auth", () => ({
  startLogout: jest.fn(),
}));

jest.mock("../../../actions/notes", () => ({
  startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    notes: [],
    active: null
  }
}

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store} >
      <Sidebar />
  </Provider>
)

describe('Pruebas en <Sidebar />', () => {

  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  })

  test('Debe mostrarse correctamente', () => {
    //SnapShot
    expect( wrapper ).toMatchSnapshot();
  });
  

  test('Debe llamar al logout', () => {
    //Debe llamar la acción del logout
    wrapper.find('.btn').simulate('click');
    expect( startLogout ).toHaveBeenCalled();
  });

  test('Debe llamar al startNewNote', () => {
    //debe llamar la acción del startNewNote
    wrapper.find('.journal__new-entry').prop('onClick')();
    expect( startNewNote ).toHaveBeenCalled();
  });

});
