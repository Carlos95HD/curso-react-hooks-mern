import { addHours } from "date-fns/esm";

export const events = [
  {
    id: "1",
    start: new Date("2022-10-21 13:00:00"),
    end: addHours(new Date("2022-10-21 15:00:00"), 2),
    title: "Cumpleaños",
    notes: "Lorem ipsum dolor sit amet, consectetur adip",
  },
  {
    id: "2",
    start: new Date("2022-10-09 13:00:00"),
    end: addHours(new Date("2022-10-09 15:00:00"), 2),
    title: "Nota-2",
    notes: "Lorem ipsum notes2",
  },
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null,
};

export const calendarWithActiveEvent = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0] },
};
