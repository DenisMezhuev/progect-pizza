import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import PizzaBlock from "./PizzaBlock/PizzaBlock";
import Skeleton from "./PizzaBlock/Skeleton";

function ContentItems() {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    fetch("https://65dc5231e7edadead7eb99a6.mockapi.io/items")
      .then((response) => response.json())
      .then((date) => setPizzas(date))
      .catch((e) => console.log(e));
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="content__items">
      {pizzas.length
        ? pizzas.map((elem) => <PizzaBlock key={uuidv4()} {...elem} />)
        : [...new Array(6)].map((elem) => <Skeleton key={uuidv4()} />)}
    </div>
  );
}

export default ContentItems;
