import { expect, test, describe, jest } from '@jest/globals';
import {
  userOrdersSlice,
  initialState,
  createNewOrder,
  getUserOrders,
  getOrderbyNumber,
  clearNewOrder
} from './userOrdersSlice';

const expectedOrders = [
  {
    _id: '6915c663a64177001b31e6c9',
    ingredients: ['643d69a5c3f7b9001cfa0941', '643d69a5c3f7b9001cfa0942'],
    status: 'done',
    name: 'Био-марсианский spicy бургер',
    createdAt: '2025-11-13T11:52:03.203Z',
    updatedAt: '2025-11-13T11:52:03.382Z',
    number: 94135
  },
  {
    _id: '6915ada9a64177001b31e6ab',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
    status: 'done',
    name: 'Флюоресцентный бургер',
    createdAt: '2025-11-13T10:06:33.271Z',
    updatedAt: '2025-11-13T10:06:33.450Z',
    number: 94129
  },
  {
    _id: '6915cb46a64177001b31e6cd',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943'],
    status: 'done',
    name: 'Space антарианский краторный бургер',
    createdAt: '2025-11-13T12:12:54.582Z',
    updatedAt: '2025-11-13T12:12:54.814Z',
    number: 94136
  }
];

const expectedNewOrder = {
  _id: '6915d50fa64177001b31e6dc',
  ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
  status: 'done',
  name: 'Spicy метеоритный space краторный минеральный бургер',
  createdAt: '2025-11-13T12:54:39.624Z',
  updatedAt: '2025-11-13T12:54:39.801Z',
  number: 94138
};

describe('userOrdersSlice', () => {
  test('initializes correctly', () => {
    const state = userOrdersSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
  test('clearNewOrder reducer initializes correctly', () => {
    const prevState = { ...initialState, newOrder: expectedNewOrder };
    const newState = userOrdersSlice.reducer(prevState, clearNewOrder());
    expect(newState).toEqual({ ...initialState, newOrder: null });
  });
  test('createNewOrder.pending', () => {
    const pendingAction = {
      type: createNewOrder.pending.type
    };
    const newState = userOrdersSlice.reducer(initialState, pendingAction);
    expect(newState).toEqual({ ...initialState, loading: true });
  });
  test('createNewOrder.rejected', () => {
    const rejectedAction = {
      type: createNewOrder.rejected.type,
      error: { message: 'Error' }
    };
    const newState = userOrdersSlice.reducer(initialState, rejectedAction);
    expect(newState).toEqual({
      ...initialState,
      error: 'Error',
      loading: false
    });
  });
  test('createNewOrder.fulfilled', () => {
    const fulfilledAction = {
      type: createNewOrder.fulfilled.type,
      payload: { order: expectedNewOrder }
    };
    const newState = userOrdersSlice.reducer(initialState, fulfilledAction);
    expect(newState).toEqual({
      ...initialState,
      loading: false,
      newOrder: expectedNewOrder
    });
  });
  test('getUserOrders.pending', () => {
    const pendingAction = {
      type: getUserOrders.pending.type
    };
    const newState = userOrdersSlice.reducer(initialState, pendingAction);
    expect(newState).toEqual({ ...initialState, loading: true });
  });
  test('getUserOrders.rejected', () => {
    const rejectedAction = {
      type: getUserOrders.rejected.type,
      error: { message: 'Error' }
    };
    const newState = userOrdersSlice.reducer(initialState, rejectedAction);
    expect(newState).toEqual({
      ...initialState,
      error: 'Error',
      loading: false
    });
  });
  test('getUserOrders.fulfilled', () => {
    const fulfilledAction = {
      type: getUserOrders.fulfilled.type,
      payload: expectedOrders
    };
    const newState = userOrdersSlice.reducer(initialState, fulfilledAction);
    expect(newState).toEqual({
      ...initialState,
      loading: false,
      userOrders: expectedOrders
    });
  });
  test('getOrderbyNumber.pending', () => {
    const pendingAction = {
      type: getOrderbyNumber.pending.type
    };
    const newState = userOrdersSlice.reducer(initialState, pendingAction);
    expect(newState).toEqual({ ...initialState, loading: true });
  });
  test('getOrderbyNumber.rejected', () => {
    const rejectedAction = {
      type: getOrderbyNumber.rejected.type,
      error: { message: 'Error' }
    };
    const newState = userOrdersSlice.reducer(initialState, rejectedAction);
    expect(newState).toEqual({
      ...initialState,
      loading: false,
      error: 'Error'
    });
  });
  test('getOrderbyNumber.fulfilled', () => {
    const fulfilledAction = {
      type: getOrderbyNumber.fulfilled.type,
      payload: { orders: expectedOrders }
    };
    const newState = userOrdersSlice.reducer(initialState, fulfilledAction);
    expect(newState).toEqual({
      ...initialState,
      loading: false,
      orders: expectedOrders
    });
  });
});
