import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  userOrders: TOrder[];
  newOrder: TOrder | null;
  loading: boolean;
  error: string | undefined;
};

const initialState: TOrdersState = {
  userOrders: [],
  newOrder: null,
  loading: false,
  error: undefined
};

export const createNewOrder = createAsyncThunk(
  'userOrders/createNewOrder',
  async (data: string[]) => {
    const result = await orderBurgerApi(data);
    return result;
  }
);

export const getUserOrders = createAsyncThunk(
  'userOrders/getUserOrders',
  async () => {
    const result = await getOrdersApi();
    return result;
  }
);

export const getOrderbyNumber = createAsyncThunk(
  'userOrders/getOrderbyNumber',
  async (number: number) => {
    const result = await getOrderByNumberApi(number);
    return result;
  }
);

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    clearNewOrder: (state) => {
      state.newOrder = null;
    }
  },
  selectors: {
    userOrdersSelector: (state) => state.userOrders,
    newOrderSelector: (state) => state.newOrder,
    loadingOrderSelector: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.newOrder = action.payload.order;
        state.error = undefined;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
        state.error = undefined;
      })
      .addCase(getOrderbyNumber.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getOrderbyNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderbyNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload.orders;
        state.error = undefined;
      });
  }
});

export const { userOrdersSelector, newOrderSelector, loadingOrderSelector } =
  userOrdersSlice.selectors;
export const { clearNewOrder } = userOrdersSlice.actions;
