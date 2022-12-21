import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { BasketProductType } from '../../types/product';
import { BasketProcess } from '../../types/state';
import { postCouponAction, postOrderAction } from '../api-actions';


export const basketInitialState: BasketProcess = {
  showCart: false,
  showCartSuccess: false,
  showRemoveProduct: false,
  showBasketSuccess: false,
  productId: '',
  basketProducts: [],
  totalQuantity: 0,
  couponDiscount: 0,
};

export const basketProcess = createSlice({
  name: NameSpace.Basket,
  initialState: basketInitialState,
  reducers: {
    cartToggler(state) {
      state.showCart = !state.showCart;
    },
    succesCartToggler(state) {
      state.showCartSuccess = !state.showCartSuccess;
    },
    succesBasketToggler(state) {
      state.showBasketSuccess = !state.showBasketSuccess;
    },
    removeProductToggler(state) {
      state.showRemoveProduct = !state.showRemoveProduct;
    },
    productSelector(state, action) {
      state.productId = action.payload as string;
    },
    basketProductCounter(state, action) {
      const newProduct = action.payload as BasketProductType;
      const existingProduct = state.basketProducts.find((product) => product.id === newProduct.id);
      if(!existingProduct) {
        state.basketProducts.push(newProduct);
      }
      else {
        existingProduct.quantity = existingProduct.quantity + newProduct.quantity;
      }
    },
    basketProductRemover(state, action) {
      const id = action.payload as number;
      state.basketProducts = state.basketProducts.filter((product) => product.id !== id);
    },
    basketProductSetter(state, action) {
      const newProduct = action.payload as BasketProductType;
      const existingProduct = state.basketProducts.find((product) => product.id === newProduct.id);
      if(existingProduct !== undefined){
        existingProduct.quantity = newProduct.quantity;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postCouponAction.fulfilled, (state, action) => {
        state.couponDiscount = action.payload as number;
      });
    builder
      .addCase(postOrderAction.fulfilled, (state) => {
        state.basketProducts = state.basketProducts.filter((product) => product.id === null);
        state.showBasketSuccess = !state.showBasketSuccess;
      });
  }
});
export const { cartToggler, succesCartToggler, removeProductToggler, productSelector, basketProductCounter, basketProductRemover, basketProductSetter, succesBasketToggler} = basketProcess.actions;
export default basketProcess.reducer;

