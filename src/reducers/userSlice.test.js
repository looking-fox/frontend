import user, { logout } from "./userSlice";

const initialState = {
  isAuthenticated: false,
  reachedFreemiumLimit: false,
  isPremiumUser: false,
  displayName: "",
  email: "",
  userId: null,
  starWarsInfo: {},
  error: false
};

describe("user reducer", () => {
  it("Should handle initial state", () => {
    expect(user(undefined, {})).toEqual(initialState);
  });

  it("Should handle logout and return to initial state", () => {
    expect(
      user([], {
        type: logout.type,
        payload: null
      })
    ).toEqual(initialState);
  });
});
