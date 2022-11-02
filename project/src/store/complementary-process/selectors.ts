import { NameSpace } from '../../const';
import { PromoType } from '../../types/product';
import { State } from '../../types/state';

export const getPromo = (state: State): PromoType => state[NameSpace.Complementary].promo;
export const getLoadedPromoStatus = (state: State): boolean => state[NameSpace.Complementary].isPromoDataLoaded;
