import { expect, test, describe, jest } from '@jest/globals';
import {
  ingredientsSlice,
  getIngredients,
  initialState
} from './ingredientsSlice';

const expectedIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

describe('ingredientsSlice', () => {
  test('initializes correctly', () => {
    const state = ingredientsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
  test('getIngredients.pending', () => {
    const pendingAction = {
      type: getIngredients.pending.type
    };
    const newState = ingredientsSlice.reducer(initialState, pendingAction);
    expect(newState).toEqual({ ...initialState, loading: true });
  });
  test('getIngredients.rejected', () => {
    const rejectedAction = {
      type: getIngredients.rejected.type,
      error: { message: 'Error' }
    };
    const newState = ingredientsSlice.reducer(initialState, rejectedAction);
    expect(newState).toEqual({
      ...initialState,
      error: 'Error',
      loading: false
    });
  });
  test('getIngredients.fulfilled', () => {
    const fulfilledAction = {
      type: getIngredients.fulfilled.type,
      payload: expectedIngredients
    };
    const newState = ingredientsSlice.reducer(initialState, fulfilledAction);
    expect(newState).toEqual({
      ...initialState,
      ingredients: expectedIngredients,
      loading: false
    });
  });
});
