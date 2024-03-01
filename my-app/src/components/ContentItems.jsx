import React, { useEffect, useRef } from "react";
import axios from "axios";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PizzaBlock from "./PizzaBlock/PizzaBlock";
import Skeleton from "./PizzaBlock/Skeleton";
import { setFilters } from "./redux/slices/filterSlice";
import { fetchPizzas } from "./redux/slices/pizzasSlice";

function ContentItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pageCount, categoryId, sort, searchValue } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector((state) => state.pizzas);

  const categoriesIndex =
    categoryId - 1 >= 0 ? `category=${categoryId - 1}` : "";

  const search = searchValue ? `&search=${searchValue}` : "";
  const pageLimit = `page=${pageCount}&limit=${4}&`;
  const isSearch = useRef(false);
  const isMount = useRef(false);
  const list = ["rating", "price", "title"];

  const getPizzas = async () => {
    dispatch(fetchPizzas({ categoriesIndex, pageLimit, sort, search }));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortV = list.find((elem) => elem === params.sort);

      dispatch(
        setFilters({
          ...params,
          sortV,
        })
      );
      isSearch.current = true;
    }
  }, []);
  useEffect(() => {
    getPizzas();
    isSearch.current = false;
  }, [categoryId, sort, searchValue, pageCount]);

  useEffect(() => {
    if (isMount.current) {
      const queryString = qs.stringify({
        sort,
        categoryId,
        pageCount,
      });
      console.log(queryString);
      navigate(`?${queryString}`);
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
}

export default ContentItems;
