import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import PizzaBlock from "./PizzaBlock/PizzaBlock";
import Skeleton from "./PizzaBlock/Skeleton";
import { ContextId } from "../pages/Home";
import { ContextValueInput } from "../App";

function ContentItems() {
  const [pizzas, setPizzas] = useState([]);
  const { categoriesId, sortType, currentPage } = useContext(ContextId);
  const searchValue = useContext(ContextValueInput);
  console.log(searchValue);

  const categoriesIndex =
    categoriesId - 1 >= 0 ? `category=${categoriesId - 1}` : "";

  const search = searchValue ? `&search=${searchValue}` : "";
  const pageLimit = `page=${currentPage}&limit=${4}&`;
  useEffect(() => {
    fetch(
      `https://65dc5231e7edadead7eb99a6.mockapi.io/items?${pageLimit}${categoriesIndex}&sortBy=${sortType}&order=desc${search}`
    )
      .then((response) => response.json())
      .then((date) => setPizzas(date))
      .catch((e) => console.log(e));
    window.scrollTo(0, 0);
  }, [categoriesId, sortType, searchValue, currentPage]);

  //            .filter((elem) =>elem.title.toLowerCase().includes(searchValue.toLowerCase()))
  return (
    <div className="content__items">
      {pizzas.length
        ? pizzas.map((elem) => <PizzaBlock key={uuidv4()} {...elem} />)
        : [...new Array(6)].map((elem) => <Skeleton key={uuidv4()} />)}
    </div>
  );
}

export default ContentItems;
