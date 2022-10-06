import { NameSpace } from '../../const';
import { ProductType } from '../../types/product';
import { State } from '../../types/state';

export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Product].isDataLoaded;
export const getProducts = (state: State): ProductType[] => state[NameSpace.Product].products;
