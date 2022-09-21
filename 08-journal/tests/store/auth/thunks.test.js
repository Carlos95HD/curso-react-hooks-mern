import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout, startGoogleSignIn } from "../../../src/store/auth";
import { checkingAuthentication, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers')

describe("Pruebas en AuthThunks", () => {
  const dispatch = jest.fn();
  beforeEach( () => jest.clearAllMocks() )

  test("debe invocar el checkingAuthentication", async() => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
  });

  test('startGoogleSignIn debe llamar checkingCredentials y login - exito', async() => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue( loginData );

    //thunks
    await startGoogleSignIn()( dispatch );

    expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
    expect(dispatch).toHaveBeenCalledWith( login(loginData) );

  });

  test('startGoogleSignIn debe llamar checkingCredentials y logout - error', async() => {

    const loginData = { ok: false, errorMessage: 'Un error en google' };
    await signInWithGoogle.mockResolvedValue( loginData );

    //thunks
    await startGoogleSignIn()( dispatch );

    // expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
    expect(dispatch).toHaveBeenCalledWith( logout( loginData.errorMessage ));
  });

  test('startLoginWithEmailPassword debe llamar checkingCredentials y login - exito', async() => {

    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456'}

    await loginWithEmailPassword.mockResolvedValue( loginData );
    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
    expect(dispatch).toHaveBeenCalledWith( login(loginData) );
  });

  test('startlogout debe llamar logoutFirebase, clearNotes y logout', async() => {

    await startLogout()(dispatch);

    expect( logoutFirebase ).toHaveBeenCalled();
    expect( dispatch).toHaveBeenCalledWith( clearNotesLogout() );
    expect( dispatch ).toHaveBeenCalledWith( logout() );
  });

});
