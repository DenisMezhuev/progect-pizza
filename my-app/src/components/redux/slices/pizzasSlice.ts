import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TSort } from "./filterSlice";

enum StatusPizzas {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type TPizzaStatus = StatusPizzas;
type TPizzaItems = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  id: string;
  category: string;
  rating: number;
};
interface IPizzasInitialState {
  items: TPizzaItems[];
  status: TPizzaStatus;
}
const initialState: IPizzasInitialState = {
  items: [],
  status: StatusPizzas.LOADING,
};

export type SearchPizzasParams = {
  categoriesIndex: string;
  pageLimit: string;
  sort: TSort;
  search: string;
};

export const fetchPizzas = createAsyncThunk<TPizzaItems[], SearchPizzasParams>(
  "pizzas/fetchPizzasStatus",
  async ({ categoriesIndex, pageLimit, sort, search }) => {
    const { data } = await axios.get<TPizzaItems[]>(
      `https://65dc5231e7edadead7eb99a6.mockapi.io/items?${pageLimit}${categoriesIndex}&sortBy=${sort}&order=desc${search}`
    );
    return data;
  }
);
const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<TPizzaItems[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = StatusPizzas.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = StatusPizzas.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = StatusPizzas.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
