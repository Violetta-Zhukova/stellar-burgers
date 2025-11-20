import { expect, test, describe, jest } from '@jest/globals';
import {
  initialState,
  burgerSlice,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearIngredients
} from './burgerSlice';

const burgerState = {
  constructorItems: {
    bun: {
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
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: '11111'
      },
      {
        _id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
        id: '22222'
      }
    ]
  }
};

const newIngredient = {
  _id: '643d69a5c3f7b9001cfa0940',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
};

const newBun = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

describe('burgerSlice', () => {
  test('initializes correctly', () => {
    const state = burgerSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
  test('add an ingredient to burger constructor', () => {
    const newState = burgerSlice.reducer(
      burgerState,
      addIngredient(newIngredient)
    );
    const updatedIngredients = [...newState.constructorItems.ingredients];
    updatedIngredients[2] = {
      ...updatedIngredients[2],
      id: '00000'
    };

    expect(updatedIngredients).toHaveLength(3);
    expect(updatedIngredients).toEqual([
      ...burgerState.constructorItems.ingredients,
      { ...newIngredient, id: '00000' }
    ]);
  });
  test('add a bun to burger constructor', () => {
    const newState = burgerSlice.reducer(burgerState, addIngredient(newBun));
    const { bun } = newState.constructorItems;
    expect(bun).toEqual(newBun);
  });
  test('delete the ingredient from burger constructor', () => {
    const newState = burgerSlice.reducer(
      burgerState,
      removeIngredient('11111')
    );
    const { ingredients } = newState.constructorItems;
    expect(ingredients).toHaveLength(1);
    expect(ingredients).toEqual([burgerState.constructorItems.ingredients[1]]);
  });
  test('swap ingredients', () => {
    const newState = burgerSlice.reducer(
      burgerState,
      moveIngredient({ from: 0, to: 1 })
    );
    const { ingredients } = newState.constructorItems;
    expect(ingredients).toEqual([
      burgerState.constructorItems.ingredients[1],
      burgerState.constructorItems.ingredients[0]
    ]);
  });
  test('clear burger constructor', () => {
    const newState = burgerSlice.reducer(burgerState, clearIngredients());
    expect(newState).toEqual(initialState);
  });
});
