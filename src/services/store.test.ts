import { expect, test, describe, jest } from '@jest/globals';
import { rootReducer } from './store';

describe('store', () => {
  test('rootReducer initializes correctly', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burger');
    expect(initialState).toHaveProperty('feeds');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('userOrders');
  });
});
