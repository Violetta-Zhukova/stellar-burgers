import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearNewOrder,
  createNewOrder,
  loadingOrderSelector,
  newOrderSelector
} from '../../services/userOrdersSlice/userOrdersSlice';
import { useNavigate } from 'react-router-dom';
import { isAuthenticatedSelector } from '../../services/userSlice/userSlice';
import { clearIngredients } from '../../services/burgerSlice/burgerSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { constructorItems } = useSelector((state) => state.burger);
  const orderRequest = useSelector(loadingOrderSelector);
  const newOrder = useSelector(newOrderSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const orderItems = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createNewOrder(orderItems));
  };

  const closeOrderModal = () => {
    dispatch(clearIngredients());
    dispatch(clearNewOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={newOrder}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
