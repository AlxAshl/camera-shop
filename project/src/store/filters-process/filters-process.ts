import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ExtraFilters, FiltersProcess } from '../../types/state';
import { fetchAllProductsAction, fetchFilteredProductsAction } from '../api-actions';

export const filtersInitialState: FiltersProcess = {
  pageUpdate: false,
  allProducts: [],
  filteredProducts: [],
  extraFilters: {
    minprice: [] as string[],
    maxprice: [] as string[],
    sort: [] as string[],
    order: [] as string[],
    search: [] as string[],
    level: [] as string[],
    category: [] as string[],
    type: [] as string[]
  }
};

export const filtersProcess = createSlice({
  name: NameSpace.Filters,
  initialState: filtersInitialState,
  reducers: {
    pageUpdateSetter(state, action) {
      state.pageUpdate = action.payload as boolean;
    },
    filtersSetter(state, action) {
      state.extraFilters = action.payload as ExtraFilters;
    },
    sortFilterSetter(state, action) {
      state.extraFilters.sort = action.payload as string[];
    },
    orderFilterSetter(state, action) {
      state.extraFilters.order = action.payload as string[];
    },
    searchFilterSetter(state, action) {
      state.extraFilters.search = action.payload as string[];
    },
    levelFilterSetter(state, action) {
      state.extraFilters.level = action.payload as string[];
    },
    categoryFilterSetter(state, action) {
      state.extraFilters.category = action.payload as string[];
    },
    typeFilterSetter(state, action) {
      state.extraFilters.type = action.payload as string[];
    },
    minPriceFilterSetter(state, action) {
      state.extraFilters.minprice = action.payload as string[];
    },
    maxPriceFilterSetter(state, action) {
      state.extraFilters.maxprice = action.payload as string[];
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchAllProductsAction.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(fetchFilteredProductsAction.fulfilled, (state, action) => {
        state.filteredProducts = action.payload;
      });
  }
});

export default filtersProcess.reducer;
export const {
  pageUpdateSetter,
  filtersSetter,
  sortFilterSetter,
  orderFilterSetter,
  searchFilterSetter,
  levelFilterSetter,
  categoryFilterSetter,
  typeFilterSetter,
  minPriceFilterSetter,
  maxPriceFilterSetter
} = filtersProcess.actions;
