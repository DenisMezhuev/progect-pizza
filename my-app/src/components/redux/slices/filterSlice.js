import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  pageCount: 1,
  categoryId: 0,
  sort: "rating",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    setFilters: (state, action) => {
      if (Object.keys(action.payload).length) {
        state.pageCount = Number(action.payload.pageCount);
        state.sort = action.payload;
        state.categoryId = Number(action.payload.categoryId);
      } else {
        state.pageCount = 1;
        state.categoryId = 0;
        state.sort = "rating";
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
