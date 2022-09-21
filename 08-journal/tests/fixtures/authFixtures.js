export const initialState = {
  status: 'checking', //"cheking", "not-authenticated", "authenticated"
  uid: null,
  email:null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: 'authenticated',
  uid: "2asdax2",
  email:'demo@gmail.com',
  displayName: 'Demo user',
  photoURL: 'https://demo.jpg',
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: 'not-authenticated',
  uid: null,
  email:null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser = {
  uid: "2asdax2",
  email:'demo@gmail.com',
  displayName: 'Demo user',
  photoURL: 'https://demoxzaw.jpg',
};