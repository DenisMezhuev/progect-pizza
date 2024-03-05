import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum ESort {
  RATING = "rating",
  PRICE = "price",
  TITLE = "title",
}
export type TSort = ESort;

export interface IFilterInitialState {
  searchValue: string;
  pageCount: number;
  categoryId: number;
  sort: TSort;

}
const initialState: IFilterInitialState = {
  searchValue: "",
  pageCount: 1,
  categoryId: 0,
  sort: ESort.RATING,

};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action: PayloadAction<TSort>) => {
      state.sort = action.payload;
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload;
    },
    setFilters: (state, action: PayloadAction<IFilterInitialState>) => {
      if (Object.keys(action.payload).length) {
        state.pageCount = Number(action.payload.pageCount);
        state.sort = action.payload.sort;
        state.categoryId = Number(action.payload.categoryId);
      } else {
        state.pageCount = 1;
        state.categoryId = 0;
        state.sort = ESort.RATING;
      }
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setPageCount,
  setFilters,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
