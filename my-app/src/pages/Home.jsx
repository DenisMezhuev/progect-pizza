import React, { useState, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import ContentItems from "../components/ContentItems";
import Pagination from "../Pagination/Pagination";
import { setPageCount } from "../components/redux/slices/filterSlice";

function Home() {
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <ContentItems />
      <Pagination onChangePage={(number) => dispatch(setPageCount(number))} />
    </div>
  );
}

export default Home;
