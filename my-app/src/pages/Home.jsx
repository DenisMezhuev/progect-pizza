import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import ContentItems from "../components/ContentItems";

function Home() {
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <ContentItems />
    </>
  );
}

export default Home;
