import { expect, test, describe, jest } from '@jest/globals';
import {
  initialState,
  userSlice,
  loginUser,
  getUser,
  registerUser,
  updateUser,
  logoutUser,
  authChecked
} from './userSlice';
import { TUser } from '@utils-types';

const user: TUser = {
  email: 'user@user.ru',
  name: 'Ivan Ivanov'
};

const userUpdate: TUser = {
  email: 'user@user.ru',
  name: 'Petr Petrov'
};

describe('userSlice', () => {
  test('initialize authChecked reducer', () => {
    const state = userSlice.reducer(initialState, authChecked());
    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });
  test('loginUser.pending', () => {
    const pendingAction = { type: loginUser.pending.type };
    const newState = userSlice.reducer(initialState, pendingAction);
    expect(newState).toEqual({ ...initialState, isAuthChecked: false });
  });
  test('loginUser.rejected', () => {
    const rejectedAction = {
      type: loginUser.rejected.type,
      error: { message: 'Error' }
    };
    const newState = userSlice.reducer(initialState, rejectedAction);
    expect(newState).toEqual({
      ...initialState,
      loginUserError: 'Error',
      isAuthChecked: true,
      isAuthenticated: false
    });
  });
  test('loginUser.fulfilled', () => {
    const fulfilledAction = { type: loginUser.fulfilled.type, payload: user };
    const newState = userSlice.reducer(initialState, fulfilledAction);
    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true,
      userData: user
    });
  });
  test('registerUser.pending', () => {
    const pendingAction = { type: registerUser.pending.type };
    const newState = userSlice.reducer(initialState, pendingAction);
    expect(newState).toEqual({ ...initialState, isAuthChecked: false });
  });
  test('registerUser.rejected', () => {
    const rejectedAction = {
      type: registerUser.rejected.type,
      error: { message: 'Error' }
    };
    const newState = userSlice.reducer(initialState, rejectedAction);
    expect(newState).toEqual({
      ...initialState,
      registerUserError: 'Error',
      isAuthChecked: true,
      isAuthenticated: false
    });
  });
  test('registerUser.fulfilled', () => {
    const fulfilledAction = {
      type: registerUser.fulfilled.type,
      payload: user
    };
    const newState = userSlice.reducer(initialState, fulfilledAction);
    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true,
      userData: user
    });
  });
  test('getUser.pending', () => {
    const pendingAction = { type: getUser.pending.type };
    const newState = userSlice.reducer(initialState, pendingAction);
    expect(newState).toEqual({ ...initialState, isAuthChecked: false });
  });
  test('getUser.rejected', () => {
    const rejectedAction = {
      type: getUser.rejected.type,
      error: { message: 'Error' }
    };
    const newState = userSlice.reducer(initialState, rejectedAction);
    expect(newState).toEqual({
      ...initialState,
      loginUserError: 'Error',
      isAuthChecked: true,
      isAuthenticated: false
    });
  });
  test('getUser.fulfilled', () => {
    const fulfilledAction = {
      type: getUser.fulfilled.type,
      payload: { user }
    };
    const newState = userSlice.reducer(initialState, fulfilledAction);
    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true,
      userData: user
    });
  });
  test('updateUser.pending', () => {
    const pendingAction = { type: updateUser.pending.type };
    const newState = userSlice.reducer(initialState, pendingAction);
    expect(newState).toEqual({ ...initialState, isAuthChecked: false });
  });
  test('updateUser.rejected', () => {
    const rejectedAction = {
      type: updateUser.rejected.type,
      error: { message: 'Error' }
    };
    const newState = userSlice.reducer(initialState, rejectedAction);
    expect(newState).toEqual({
      ...initialState,
      updateUserError: 'Error',
      isAuthChecked: true,
      isAuthenticated: true
    });
  });
  test('updateUser.fulfilled', () => {
    const prevState = { ...initialState, userData: user };
    const fulfilledAction = {
      type: updateUser.fulfilled.type,
      payload: { user: userUpdate }
    };
    const newState = userSlice.reducer(prevState, fulfilledAction);
    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true,
      userData: userUpdate
    });
  });
  test('logoutUser.pending', () => {
    const pendingAction = { type: logoutUser.pending.type };
    const newState = userSlice.reducer(initialState, pendingAction);
    expect(newState).toEqual({ ...initialState, isAuthChecked: false });
  });
  test('logoutUser.rejected', () => {
    const rejectedAction = {
      type: logoutUser.rejected.type,
      error: { message: 'Error' }
    };
    const newState = userSlice.reducer(initialState, rejectedAction);
    expect(newState).toEqual({
      ...initialState,
      logoutError: 'Error',
      isAuthChecked: true,
      isAuthenticated: true
    });
  });
  test('logoutUser.fulfilled', () => {
    const prevState = {
      ...initialState,
      userData: user,
      isAuthChecked: true,
      isAuthenticated: true
    };
    const fulfilledAction = {
      type: logoutUser.fulfilled.type
    };
    const newState = userSlice.reducer(prevState, fulfilledAction);
    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true
    });
  });
});
