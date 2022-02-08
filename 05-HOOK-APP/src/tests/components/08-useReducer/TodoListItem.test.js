import { shallow } from "enzyme";
import React from "react";
import { TodoListItem } from "../../../components/08-useReducer/TodoListItem";
import { demoTodos } from "../../fixtures/demoTodos";

//demoTodos
describe("Pruebas en <TodoListItem />", () => {
  const handleToggle = jest.fn();
  const handleDelete = jest.fn();

  const wrapper = shallow(
    <TodoListItem
      todo={demoTodos[1]}
      index={1}
      handleDelete={handleDelete}
      handleToggle={handleToggle}
    />
  );

  test("should mostrar correctamente", () => {
    //Snapshot
    expect(wrapper).toMatchSnapshot();
  });

  test("should llamar la función handleDelete", () => {
    // jest.fn()???
    wrapper.find("button").simulate("click");
    // toHaveBeenCalledWith
    expect(handleDelete).toHaveBeenCalledWith(demoTodos[1].id);
  });

  test("should llamar la función handleToggle", () => {
    wrapper.find("p").simulate("click");
    // toHaveBeenCalledWith
    expect(handleDelete).toHaveBeenCalledWith(demoTodos[1].id);
  });

  test("should mostrar el texto correctamente", () => {
    //contenido del parrafo
    const p = wrapper.find("p");
    expect(p.text().trim()).toBe(`2. ${demoTodos[1].desc}`);
  });

  test("should tener la clase complete si el TODO.done === true", () => {
    const todo = demoTodos[0];
    todo.done = true;

    const wrapper = shallow(<TodoListItem todo={todo} />);
    expect(wrapper.find("p").hasClass("complete")).toBe(true);
  });
});
