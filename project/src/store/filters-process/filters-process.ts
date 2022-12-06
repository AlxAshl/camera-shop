import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ExtraFilters, FiltersProcess } from '../../types/state';
import { fetchAllProductsAction } from '../api-actions';

export const filtersInitialState: FiltersProcess = {
  pageUpdate: false,
  allProducts: [],
  extraFilters: {
    PriceMin: [] as string[],
    PriceMax: [] as string[],
    Sort: [] as string[],
    Order: [] as string[],
    Search: [] as string[],
    Level: [] as string[],
    Category: [] as string[],
    Type: [] as string[]
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
      state.extraFilters.Sort = action.payload as string[];
    },
    orderFilterSetter(state, action) {
      state.extraFilters.Order = action.payload as string[];
    },
    searchFilterSetter(state, action) {
      state.extraFilters.Search = action.payload as string[];
    },
    levelFilterSetter(state, action) {
      state.extraFilters.Level = action.payload as string[];
    },
    categoryFilterSetter(state, action) {
      state.extraFilters.Category = action.payload as string[];
    },
    typeFilterSetter(state, action) {
      state.extraFilters.Type = action.payload as string[];
    },
    minPriceFilterSetter(state, action) {
      state.extraFilters.PriceMin = action.payload as string[];
    },
    maxPriceFilterSetter(state, action) {
      state.extraFilters.PriceMax = action.payload as string[];
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchAllProductsAction.fulfilled, (state, action) => {
        state.allProducts = action.payload;
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
