import { addHours } from "date-fns";
import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onlogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEvent, calendarWithEventsState, events, initialState } from "../../fixtures/calendarState";

describe('Prueba en calendarSlice', () => {

  test('debe regresar el estado por defecto', () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual( initialState )
  })

  test('onSetActiveEvent debe activar el evento', () => {
    const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent( events[0] ));
    expect(state.activeEvent).toEqual( events[0] );
  })

  test('onAddNewEvent debe agregar el evento', () => {
    const newEvent = {
      id: "1",
      start: new Date("2020-10-21 13:00:00"),
      end: addHours(new Date("2020-10-21 15:00:00"), 2),
      title: "Ventas",
      notes: "Lorem ipsum dolor sit amet, consectetur adip",
    }
    const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent( newEvent ));
    expect(state.events).toEqual([...events, newEvent]);
  })

  test('onUpdateEvent debe actualizar el evento', () => {
    const updatedEvent = {
      id: "1",
      start: new Date("2020-10-21 13:00:00"),
      end: addHours(new Date("2020-10-21 15:00:00"), 2),
      title: "Ventas actualizado",
      notes: "Lorem ipsum dolor sit amet, consectetur adip, Updated",
    }
    const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent( updatedEvent ));
    // expect(state.events).toEqual([...events, updatedEvent]);
    expect(state.events).toContain( updatedEvent );
  })

  test('onDeleteEvent debe borrar el evento activo', () => {
    const state = calendarSlice.reducer(calendarWithActiveEvent, onDeleteEvent(events[0]));
    expect(state.activeEvent).toBe(null)
    expect(state.events).not.toContain( events[0] );
  })

  test('onLoadEvents debe establecer los eventos', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(( events )));
    expect( state.isLoadingEvents ).toBeFalsy()
    expect( state.events ).toEqual(events);

    const newState = calendarSlice.reducer(initialState, onLoadEvents(( events )));
    expect( newState.events.length ).toBe(events.length);
  })

  test('onlogoutCalendar debe limpiar el estado', () => {
    const state = calendarSlice.reducer(calendarWithActiveEvent, onlogoutCalendar());
    expect(state).toEqual(initialState);
  })
})