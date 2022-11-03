import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useAuthStore } from "../../src/hooks";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock("../../src/hooks/useAuthStore");
//Mock de calendarPage para evitar renderizados innecesarios del componente
jest.mock("../../src/calendar", () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe("Pruebas en el <AppRouter />", () => {
  const mockCheckAuthToken = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe mostrar la pantalla de cargar y llamar checkAuthToken", () => {
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: "checking",
    });

    render(<AppRouter />);
    expect(screen.getByText("Cargando...")).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test("debe mostrar el login en caso de no estar autenticado", () => {
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: "not-authenticated",
    });

    const { container } = render(
      //Verificacion del redireccionamiento con initialEntries
      <MemoryRouter initialEntries={["/auth2/testPath"]}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test("debe mostrar el calendario si estamos autenticados", () => {
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: "authenticated",
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("CalendarPage")).toBeTruthy();
  });
});
