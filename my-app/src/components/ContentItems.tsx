import React, { useEffect, useRef } from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PizzaBlock from "./PizzaBlock/PizzaBlock";
import Skeleton from "./PizzaBlock/Skeleton";
import {
  ESort,
  IFilterInitialState,
  setFilters,
} from "./redux/slices/filterSlice";
import { fetchPizzas, SearchPizzasParams } from "./redux/slices/pizzasSlice";
import { RootState, useAppDispatch } from "./redux/store";

const ContentItems: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pageCount, categoryId, sort, searchValue } = useSelector(
    (state: RootState) => state.filter
  );
  const { items, status } = useSelector((state: RootState) => state.pizzas);

  const categoriesIndex =
    categoryId - 1 >= 0 ? `category=${categoryId - 1}` : "";

  const search = searchValue ? `&search=${searchValue}` : "";
  const pageLimit = `page=${pageCount}&limit=${4}&`;
  const isSearch = useRef(false);
  const isMount = useRef(false);
  const list: string[] = ["rating", "price", "title"];

  const getPizzas = async () => {
    dispatch(fetchPizzas({ categoriesIndex, pageLimit, sort, search }));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as IFilterInitialState;

      const sort = list.find((elem) => elem === params.sort) as ESort;
      if (sort) {
        params.sort = sort;
      }
      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);
  useEffect(() => {
    getPizzas();
    isSearch.current = false;
  }, [categoryId, sort, searchValue, pageCount]);

  useEffect(() => {
    if (isMount.current) {
      const queryString = qs.stringify(
        {
          sort,
          categoryId,
          pageCount,
        },
        { skipNulls: true }
      );

      console.log(queryString);
      navigate(`?${queryString}`);
    }
    if (!window.location.search) {
      dispatch(fetchPizzas({} as SearchPizzasParams));
    }
    isMount.current = true;
  }, [categoryId, sort, searchValue, pageCount]);

  const pizzas = items.map((elem) => <PizzaBlock key={uuidv4()} {...elem} />);
  const skeleton = [...new Array(6)].map((elem) => <Skeleton key={uuidv4()} />);
  return (
    <>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Не удалось получить Пиццы</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}
    </>
  );
};

export default ContentItems;
