import { expect, test, describe, jest } from '@jest/globals';
import { feedsSlice, getFeeds, initialState } from './feedsSlice';

const expectedFeeds = {
  orders: [
    {
      _id: '6915cb46a64177001b31e6cd',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943'],
      status: 'done',
      name: 'Space антарианский краторный бургер',
      createdAt: '2025-11-13T12:12:54.582Z',
      updatedAt: '2025-11-13T12:12:54.814Z',
      number: 94136
    },
    {
      _id: '6915c663a64177001b31e6c9',
      ingredients: ['643d69a5c3f7b9001cfa0941', '643d69a5c3f7b9001cfa0942'],
      status: 'done',
      name: 'Био-марсианский spicy бургер',
      createdAt: '2025-11-13T11:52:03.203Z',
      updatedAt: '2025-11-13T11:52:03.382Z',
      number: 94135
    }
  ],
  total: 18130,
  totalToday: 67
};

describe('feedsSlice', () => {
  test('initializes correctly', () => {
    const state = feedsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
  test('getFeeds.pending', () => {
    const pendingAction = {
      type: getFeeds.pending.type
    };
    const newState = feedsSlice.reducer(initialState, pendingAction);
    expect(newState).toEqual({ ...initialState, loading: true });
  });
  test('getFeeds.rejected', () => {
    const rejectedAction = {
      type: getFeeds.rejected.type,
      error: { message: 'Error' }
    };
    const newState = feedsSlice.reducer(initialState, rejectedAction);
    expect(newState).toEqual({
      ...initialState,
      error: 'Error',
      loading: false
    });
  });
  test('getFeeds.fulfilled', () => {
    const fulfilledAction = {
      type: getFeeds.fulfilled.type,
      payload: expectedFeeds
    };
    const newState = feedsSlice.reducer(initialState, fulfilledAction);
    expect(newState).toEqual({
      ...initialState,
      feeds: expectedFeeds,
      loading: false
    });
  });
});
