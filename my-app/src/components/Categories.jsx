import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import CategoriesLi from "./CategoriesLi";

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((elem, index) => (
          <CategoriesLi
            key={uuidv4()}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            elem={elem}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
}

export default Categories;
