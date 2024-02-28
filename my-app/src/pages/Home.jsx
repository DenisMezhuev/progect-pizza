import React, { useState, createContext } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import ContentItems from "../components/ContentItems";
import Pagination from "../Pagination/Pagination";
export const Context = createContext(0);
export const ContextId = createContext(0);
export const ContextType = createContext(null);
function Home() {
  const [categoriesId, setCategoriesId] = useState(0);
  const [sortType, setSortType] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="container">
      <div className="content__top">
        <Context.Provider value={setCategoriesId}>
          <Categories />
        </Context.Provider>
        <ContextType.Provider value={setSortType}>
          <Sort />
        </ContextType.Provider>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <ContextId.Provider value={{ categoriesId, sortType, currentPage }}>
        <ContentItems />
      </ContextId.Provider>

      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
