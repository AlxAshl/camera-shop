import { NameSpace } from '../../const';
import { BasketProductType } from '../../types/product';
import { State } from '../../types/state';


export const getModalCartStatus = (state: State): boolean => state[NameSpace.Basket].showCart;
export const getProductId = (state: State): string => state[NameSpace.Basket].productId;
export const getBasketProducts = (state: State): BasketProductType[] => state[NameSpace.Basket].basketProducts;
export const getModalRemoveProductStatus = (state: State): boolean => state[NameSpace.Basket].showRemoveProduct;
export const getDiscount = (state: State): number => state[NameSpace.Basket].couponDiscount;
export const getModalCartSuccessStatus = (state: State): boolean => state[NameSpace.Basket].showCartSuccess;
export const getModalBasketSuccessStatus = (state: State): boolean => state[NameSpace.Basket].showBasketSuccess;
